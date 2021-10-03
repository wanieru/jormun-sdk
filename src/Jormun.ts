import { ILocal } from "./ILocal";
import {sha512} from "js-sha512";
import { IRemote} from "./IRemote";
import { Data, LocalData } from "./Data";
import { Key } from "./Key";
import { LocalStorage } from "./LocalStorage";
import { JomrunSyncRemote } from "./JormunSyncRemote";
import { JormunEvent } from "./Event";
import { StatusResponse } from "./ApiTypes/Status";
import { KeysResponse } from "./ApiTypes/Keys";
import { GetResponse } from "./ApiTypes/Get";
import { Unix } from "./Unix";
import { IndexedDB } from "./IndexedDB";

export interface JormunOptions
{
    app : string,
    type : "LocalOnly" | "LocalAndRemote",
    remote? : JormunRemote
}
export interface JormunRemote
{
    host : string,
    username : string,
    password : string,
    downloadSharedData : boolean
}
export interface JormunDataSet
{
    [fragment:string] : Data
}
export type AlertDelegate = (message : string, options : string[]) => Promise<number>;
export type JormunEventPayload = {key : Key, data : Data, value : any, raw : LocalData};
export class Jormun
{
    private static REMOTE_SETTINGS_KEY : Key;

    private static alertDelegate : AlertDelegate;

    private static options : JormunOptions;
    public static local : ILocal;
    public static remote : IRemote;
    private static data : {[id:number] : JormunDataSet};

    public static onDataChange : {[key : string] : JormunEvent<JormunEventPayload>} = {};
    public static onSync = new JormunEvent<boolean>();
    public static onSetup = new JormunEvent<void>();

    public static async initialize(app : string, alertDelegate : AlertDelegate)
    {
        this.local = window.indexedDB ? new IndexedDB(app) : new LocalStorage();

        this.alertDelegate = alertDelegate;

        this.REMOTE_SETTINGS_KEY = new Key(app, -9999, "REMOTE_SETTINGS");
        this.data = {};
        if(await this.local.getValue(this.REMOTE_SETTINGS_KEY) != null)
        {
            await this.setup({app:app, type : "LocalAndRemote", remote : await this.local.getValue(this.REMOTE_SETTINGS_KEY)});
        }
        else
        {
            await this.setup({app: app, type : "LocalOnly", remote: null});
        }
    }
    public static async login(remote : JormunRemote)
    {
        remote.password = sha512(remote.password);
        await this.local.setValue(this.REMOTE_SETTINGS_KEY, remote);
        await this.setup({app:this.options.app, type : "LocalAndRemote", remote : remote});
    }
    public static async sync()
    {
        if(!this.remote || !(await this.remote.loggedIn()))
            return;

        this.onSync.trigger(true);

        const status = await this.remote.status();
        const keys = await this.remote.keys();

        const comparison = await this.compareRemoteKeys(status, keys);

        if(comparison.download && comparison.upload)
        {
            const choice = await this.ask("The local and remote data cannot be combined. Which do you want to keep?", ["Local", "Remote"]);
            if(choice == 0)
                comparison.download = false;
            else if(choice == 1)
                comparison.upload = false;
        }
        if(comparison.upload)
        {
            await this.remote.delete(comparison.missingLocal);
            const uploadData = await this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote));
            const newTimestamps = await this.remote.set(uploadData);
            for(const key in newTimestamps)
            {
                const parsed = Key.parse(key, status.userId);
                const remoteString = parsed.stringifyRemote(status.userId);
                await this.data[parsed.userId][parsed.fragment].preset(uploadData[remoteString], newTimestamps[key], false);
            }
        }
        else if(comparison.download)
        {
            await this.removeLocalKeys(comparison.missingRemote);
            const getKeys = comparison.missingLocal.concat(comparison.newerRemote);
            const result = await this.remote.get(getKeys);
            await this.processDataResponse(status, keys, result);
        }
        if(this.options.remote?.downloadSharedData)
        {
            await this.removeLocalKeys(comparison.deleteShared);
            const result = await this.remote.get(comparison.newShared);
            await this.processDataResponse(status, keys, result);
        }

        this.onSync.trigger(false);
    }
    private static async getUploadData(status : StatusResponse, keys : Key[])
    {
        const uploadData = {};
        for(const i in keys)
        {
            const key = keys[i];
            const keyString = key.stringifyRemote(status.userId);
            uploadData[keyString] = await this.data[key.userId][key.fragment].get();
        }
        return uploadData;
    }
    private static async removeLocalKeys(keys : Key[])
    {
        for(const i in keys)
        {
            const key = keys[i];
            await this.data[key.userId][key.fragment].remove();
            delete this.data[key.userId][key.fragment];
        }
    }
    private static async processDataResponse(status : StatusResponse, keys : KeysResponse, result : GetResponse)
    {
        for(const key in result)
        {
            const parsed = Key.parse(key, status.userId);
            if(!this.data[parsed.userId])
                this.data[parsed.userId] = {};
            if(!this.data[parsed.userId][parsed.fragment])
                this.data[parsed.userId][parsed.fragment] = new Data(parsed);
            await this.data[parsed.userId][parsed.fragment].preset(result[key], keys[key], false); 
        }
    }
    public static async add(fragment : string, defaultValue : any) : Promise<Data>
    {
        if(!this.data[-1])
            this.data[-1] = {};
        if(!this.data[-1][fragment])
        {
            this.data[-1][fragment] = new Data(new Key(this.options.app, -1, fragment));
            await this.data[-1][fragment].preset(defaultValue, Unix(), true); 
        }
        return this.data[-1][fragment];
    }
    private static async compareRemoteKeys(status : StatusResponse, remoteKeys : KeysResponse)
    {
        let missingLocal : Key[] = []; //Keys that exist on remote but not on local
        let missingRemote : Key[] = []; //Keys that exist on local but not on remote
        let newerLocal : Key[] = []; //Keys that are newer on local
        let newerRemote : Key[] = []; //Keys that are newer on remote

        let newShared : Key[] = []; //Shared keys that are newer on remote
        let deleteShared : Key[] = []; //Shared keys that exist on local but not on remote

        for(const key in remoteKeys)
        {
            const parsed = Key.parse(key, status.userId);
            const local = parsed.userId == status.userId;
            if(local)
            {
                parsed.userId = -1;
            }
            if(!this.data[parsed.userId] || !this.data[parsed.userId][parsed.fragment])
            {
                (local ? missingLocal : newShared).push(parsed);
            }
            else
            {
                const raw = await this.data[parsed.userId][parsed.fragment].getRaw();
                const localTime = raw.timestamp;
                const remoteTime = remoteKeys[key];
                if(localTime > remoteTime || raw.isDirty)
                    (local ? newerLocal : newShared).push(parsed);
                if(remoteTime > localTime)
                    newerRemote.push(parsed);
            }
        }
        for(const user in this.data)
        {
            for(const fragment in this.data[user])
            {
                const key = this.data[user][fragment].getKey();
                if(!remoteKeys[key.stringifyRemote(status.userId)])
                    (user == "-1" ? missingRemote : deleteShared).push(key);
            }
        }

        let download = false;
        let upload = false;
        if(missingLocal.length > 0 || missingRemote.length > 0)
        {
            download = true;
            upload = true;
        }
        if(newerLocal.length > 0)
        {
            upload = true;
        }
        if(newerRemote.length > 0)
        {
            download = true;
        }
        return {download: download, upload: upload, missingLocal : missingLocal, missingRemote : missingRemote, newerLocal : newerLocal, newerRemote : newerRemote, newShared : newShared, deleteShared : deleteShared};
    }
    public static async different() : Promise<boolean>
    {
        const status = await this.remote.status();
        const keys = await this.remote.keys();
        const comparison = await this.compareRemoteKeys(status, keys);
        return comparison.download || comparison.upload;
    }
    

    private static async setup(options : JormunOptions)
    {
        this.options = options;
        if(options.type == "LocalAndRemote" && options.remote)
        {
            this.remote = new JomrunSyncRemote(options);
        }
        const keys = await this.local.getKeys();
        const newData = {};
        
        for(const i in keys)
        {
            const key = keys[i];
            if(!newData[key.userId])
                newData[key.userId] = {};
            if(this.data[key.userId] && this.data[key.userId][key.fragment])
                newData[key.userId][key.fragment] = this.data[key.userId][key.fragment];
            else
                newData[key.userId][key.fragment] = new Data(key);
        }
        this.data = newData;

        this.onSetup.trigger();

        if(this.remote)
        {
            await this.sync();
        }
    }
    public static hashedRemote = () => this.local.getValue(this.REMOTE_SETTINGS_KEY);

    public static async alert(message : string)
    {
        await this.alertDelegate(message, []);
    }
    public static async ask(message : string, options : string[])
    {
        return this.alertDelegate(message, options);
    }
    
    public static me() : JormunDataSet
    {
        if(!this.data[-1])
            this.data[-1] = {};
        return this.data[-1];
    }
    public static user(userId : number) : JormunDataSet
    {
        if(userId == this.remote?.cachedStatus()?.userId)
            return this.me();
        if(!this.data[userId])
            return null;
        return this.data[userId];
    } 
    public static friends() : {[id : number] : string}
    {
        return this.remote?.cachedStatus()?.friends;
    }
}