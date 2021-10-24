import { ILocal } from "./ILocal";
import {sha512} from "js-sha512";
import { IRemote} from "./IRemote";
import { Data, LocalData } from "./Data";
import { Key } from "./Key";
import { LocalStorage } from "./LocalStorage";
import { JormunSyncRemote } from "./JormunSyncRemote";
import { JormunEvent } from "./Event";
import { StatusResponse } from "./ApiTypes/Status";
import { KeysResponse } from "./ApiTypes/Keys";
import { GetResponse } from "./ApiTypes/Get";
import { Unix } from "./Unix";
import { IndexedDB } from "./IndexedDB";
import { BrowseResponse } from "./ApiTypes/Browse";
import { MemoryStorage } from "./MemoryStorage";

export interface JormunOptions
{
    app : string
    remote? : JormunRemote
}
export interface JormunRemote
{
    host : string,
    username : string,
    password : string,
    token : string,
    downloadSharedData : boolean
}
export interface JormunDataUsers
{
    [id:number] : JormunDataSet;
}
export interface JormunDataSet
{
    [fragment:string] : Data
}
export type AlertContent = {title : string, message : string, options : string[]};
export type AlertDelegate = (obj : AlertContent) => Promise<number>;
export type JormunEventPayload = {key : Key, data : Data, value : any, raw : LocalData};
export class Jormun
{
    private REMOTE_SETTINGS_KEY : Key;
    public static readonly CHANGED_KEYS_KEY : string = "CHANGED_KEYS";

    private alertDelegate : AlertDelegate;

    private options : JormunOptions;
    public local : ILocal;
    public remote : IRemote;
    private data : JormunDataUsers;

    public onDataChange : {[key : string] : JormunEvent<JormunEventPayload>} = {};
    public onSync = new JormunEvent<boolean>();
    public onSetup = new JormunEvent<void>();

    public async initialize(app : string, alertDelegate : AlertDelegate | null, memoryOnly : boolean = false)
    {
        if(!memoryOnly)
            this.local = window.indexedDB ? new IndexedDB(app) : new LocalStorage();
        else
            this.local = new MemoryStorage();

        this.alertDelegate = alertDelegate ?? Jormun.defaultAlertDelegate;

        this.REMOTE_SETTINGS_KEY = new Key(app, -9999, "REMOTE_SETTINGS");
        this.data = {};
        await this.setup({app:app, remote : await this.local.getValue(this.REMOTE_SETTINGS_KEY)});
    }
    public async alert(title : string, message : string)
    {
        await this.alertDelegate({title : title, message: message, options : []});
    }
    public async ask(title : string, message : string, options : string[])
    {
        return this.alertDelegate({title : title, message: message, options: options});
    }
    private async setup(options : JormunOptions)
    {
        let oldRemote : JormunRemote | null = null;
        this.options = options;
        if(options.remote)
        {
            const remote = new JormunSyncRemote(this, options);
            this.remote = remote;
            oldRemote = await this.local.getValue(this.REMOTE_SETTINGS_KEY);
            await remote.checkConnection();
            await this.local.setValue(this.REMOTE_SETTINGS_KEY, remote.jormunOptions.remote);
        }
        const keys = await this.local.getKeys();
        const newData = {};
        
        for(const i in keys)
        {
            const key = keys[i];
            if(key.stringifyLocal() == this.REMOTE_SETTINGS_KEY.stringifyLocal())
                continue;
            if(!newData.hasOwnProperty(key.userId))
                newData[key.userId] = {};
            if(this.data[key.userId] && this.data[key.userId].hasOwnProperty(key.fragment))
                newData[key.userId][key.fragment] = this.data[key.userId][key.fragment];
            else
                newData[key.userId][key.fragment] = new Data(this, key);
        }
        this.data = newData;

        this.onSetup.trigger();

        if(this.remote)
        {
            let forceDownload = false;
            if(oldRemote && oldRemote.username != options.remote?.username)
            {
                const response = await this.ask("New User", `You seem to have switched from user ${oldRemote.username} to ${options.remote.username}. Would you like to clear local data and redownload from ${options.remote.username}?`, ["Yes", "No"]);
                forceDownload = response == 0;
            }
            await this.sync(forceDownload);
        }
    }
    public async login(remote : JormunRemote)
    {
        remote.password = sha512(remote.password);
        if(!remote.host.startsWith("http"))
            remote.host = `http://${remote.host}`;
        await this.setup({app:this.options.app, remote : remote});
    }
    public hashedRemote = async () : Promise<JormunRemote> => await this.local.getValue(this.REMOTE_SETTINGS_KEY);

    public async sync(forceDownload = false)
    {
        if(!this.remote || !(await this.remote.loggedIn()))
            return;

        this.onSync.trigger(true);

        const status = await this.remote.status();
        const keys = await this.remote.keys();
        this.setSharedWith(status, keys);

        const comparison = await this.compareRemoteKeys(status, keys);
        if(forceDownload)
        {
            comparison.upload = false;
            comparison.download = true;
        }

        if(comparison.download && comparison.upload)
        {
            const choice = await this.ask("Syncing", `The local and remote data cannot be combined. Which do you want to keep?`, 
                [
                        `Local`, 
                        `Remote`, 
                        "Cancel"
                ]);
            if(choice == 0)
                comparison.download = false;
            else if(choice == 1)
                comparison.upload = false;
            else
            {
                comparison.download = false;
                comparison.upload = false;
            }
        }
        if(comparison.upload)
        {
            if(comparison.missingLocal.length > 0)
            {
                await this.remote.delete(comparison.missingLocal);
            }
            const uploadData = await this.getUploadData(status, comparison.newerLocal.concat(comparison.missingRemote));
            const newTimestamps = await this.remote.set(uploadData);
            for(const key in newTimestamps)
            {
                const parsed = Key.parse(key, status.userId);
                const remoteString = parsed.stringifyRemote(status.userId);
                const data = this.data[parsed.userId][parsed.fragment];
                await data.preset(uploadData[remoteString], newTimestamps[key], data.isPublished(), false);
            }
        }
        else if(comparison.download)
        {
            await this.removeLocalKeys(comparison.missingRemote);
            const getKeys = comparison.missingLocal.concat(comparison.newerRemote);
            if(getKeys.length > 0)
            {
                const result = await this.remote.get(getKeys);
                await this.processDataResponse(status, keys, result);
            }
        }
        if(this.options.remote?.downloadSharedData)
        {
            await this.removeLocalKeys(comparison.deleteShared);
            if(comparison.newShared.length > 0)
            {
                const result = await this.remote.get(comparison.newShared);
                await this.processDataResponse(status, keys, result);
            }
        }

        this.onSync.trigger(false);
    }
    private async compareRemoteKeys(status : StatusResponse, remoteKeys : KeysResponse)
    {
        this.add(Jormun.CHANGED_KEYS_KEY, Unix());

        let missingLocal : Key[] = []; //Keys that exist on remote but not on local
        let missingRemote : Key[] = []; //Keys that exist on local but not on remote
        let newerLocal : Key[] = []; //Keys that are newer on local
        let newerRemote : Key[] = []; //Keys that are newer on remote

        let newShared : Key[] = []; //Shared keys that are newer on remote
        let deleteShared : Key[] = []; //Shared keys that exist on local but not on remote

        if(status && remoteKeys)
        {
            for(const key in remoteKeys)
            {
                const parsed = Key.parse(key, status.userId);
                const remoteParsed = Key.parse(key, -1);
                const local = remoteParsed.userId == status.userId;
                if(!this.data.hasOwnProperty(parsed.userId) || !this.data[parsed.userId].hasOwnProperty(parsed.fragment))
                {
                    (local ? missingLocal : newShared).push(parsed);
                }
                else
                {
                    const raw = await this.data[parsed.userId][parsed.fragment].getRaw();
                    const localTime = raw?.timestamp ?? 0;
                    const remoteTime = remoteKeys[key].timestamp;
                    if(localTime > remoteTime || (raw?.isDirty ?? false))
                        (local ? newerLocal : newShared).push(parsed);
                    if(remoteTime > localTime)
                    {
                        newerRemote.push(parsed);
                    }
                }
            }
            for(const user in this.data)
            {
                for(const fragment in this.data[user])
                {
                    const key = this.data[user][fragment].getKey();
                    if(remoteKeys && !remoteKeys.hasOwnProperty(key.stringifyRemote(status?.userId ?? -1)))
                    {
                        if(user == "0")
                        {
                            missingRemote.push(key);
                        }
                        else
                        {
                            deleteShared.push(key);
                        }
                    }
                }
            }
        }

        let download = false;
        let upload = false;
        if(newerLocal.length > 0)
        {
            upload = true;
        }
        if(newerRemote.length > 0)
        {
            download = true;
        }
        if(missingRemote.find(k => k.fragment == Jormun.CHANGED_KEYS_KEY))
        {
            //we haven't initialized with the remote.
            upload = true;
            if(this.fragments(0).length > 0)
            {
                //We have other keys locally though, which might be carried over from a different session. Let's make downloading an option too.
                download = true;
            }
        }
        return {download: download, upload: upload, missingLocal : missingLocal, missingRemote : missingRemote, newerLocal : newerLocal, newerRemote : newerRemote, newShared : newShared, deleteShared : deleteShared};
    }
    public async different() : Promise<boolean>
    {
        if(!this.remote || !(await this.remote.loggedIn()))
            return false;
        const status = await this.remote.status();
        const keys = await this.remote.keys();
        this.setSharedWith(status, keys);
        const comparison = await this.compareRemoteKeys(status, keys);
        return comparison.download || comparison.upload;
    }
    private async getUploadData(status : StatusResponse, keys : Key[])
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
    private async removeLocalKeys(keys : Key[])
    {
        for(const i in keys)
        {
            const key = keys[i];
            if(key.stringifyLocal() == this.REMOTE_SETTINGS_KEY.stringifyLocal())
                continue;
            await this.data[key.userId][key.fragment].remove();
            delete this.data[key.userId][key.fragment];
        }
    }
    private async processDataResponse(status : StatusResponse, keys : KeysResponse, result : GetResponse)
    {
        for(const key in result)
        {
            const parsed = Key.parse(key, status.userId);
            if(!this.data.hasOwnProperty(parsed.userId))
                this.data[parsed.userId] = {};
            if(!this.data[parsed.userId].hasOwnProperty(parsed.fragment))
                this.data[parsed.userId][parsed.fragment] = new Data(this, parsed);
            await this.data[parsed.userId][parsed.fragment].preset(result[key], keys[key].timestamp, keys[key].public, false);
            this.data[parsed.userId][parsed.fragment].setSharedWith(keys[key].sharedWith, status.userId); 
        }
    }
    private async setSharedWith(status : StatusResponse, keys : KeysResponse)
    {
        for(const key in keys)
        {
            const parsed = Key.parse(key, status.userId);
            if(!this.data.hasOwnProperty(parsed.userId))
                this.data[parsed.userId] = {};
            if(this.data[parsed.userId].hasOwnProperty(parsed.fragment))
            {
                const data = this.data[parsed.userId][parsed.fragment];
                const raw = await data.getRaw();
                await data.preset(JSON.parse(raw.json), raw.timestamp, keys[key].public, raw.isDirty);
                data.setSharedWith(keys[key].sharedWith, status.userId); 
            }
        }
    }
    public async add(fragment : string, defaultValue : any) : Promise<Data>
    {
        if(!this.data.hasOwnProperty(0))
            this.data[0] = {};
        if(!this.data[0].hasOwnProperty(fragment))
        {
            this.data[0][fragment] = new Data(this, new Key(this.options.app, 0, fragment));
            await this.data[0][fragment].preset(defaultValue, Unix(), false, true); 
            await this.bumpChangedKeys();
        }
        return this.data[0][fragment];
    }
    public me(fragment : string) : Data
    {
        if(!this.data.hasOwnProperty(0))
            return null;
        return this.data[0][fragment] ?? null;
    }
    public user(userId : number | string, fragment : string) : Data
    {
        if(!this.data.hasOwnProperty(userId))
            return null;
        return this.data[userId][fragment] ?? null;
    }
    public async bumpChangedKeys()
    {
        await (await this.add(Jormun.CHANGED_KEYS_KEY, Unix())).set(Unix());
    }
    public users() : number[]
    {
        const users : number[] = [];
        for(const userId in this.data)
        {
            users.push(parseInt(userId));
        }
        return users;
    }
    public fragments(userId : number | string)
    {
        const keys : string[] = [];
        if(this.data.hasOwnProperty(userId))
        {
            for(const fragment in this.data[userId])
            {
                if(fragment != Jormun.CHANGED_KEYS_KEY)
                {
                    keys.push(fragment);
                }
            }
        }
        return keys;
    }

    private static async defaultAlertDelegate(obj : AlertContent) : Promise<number>
    {
        if(obj.options.length < 1)
        {
          alert(obj.message);
          return -1;
        }
        for(let i =0;true; i = (i + 1) % obj.options.length)
        {
          if(window.confirm(`${obj.message}\n\n${obj.options.join(" | ")}\n\n${obj.options[i]}?`))
            return i;
        }
    }
    public friends() : {[id : number] : string}
    {
        return this.remote?.cachedStatus()?.friends;
    }
}