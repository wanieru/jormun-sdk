import { ILocal } from "./ILocal";
import {sha512} from "js-sha512";
import { IAnonymousRemote, IPublicRemote, IRemote} from "./IRemote";
import { Data, LocalData } from "./Data";
import { Key } from "./Key";
import { LocalStorageWrap } from "./LocalStorageWrap";
import { JormunSyncRemote } from "./JormunSyncRemote";
import { JormunEvent } from "./Event";
import { StatusResponse } from "./ApiTypes/Status";
import { KeysResponse } from "./ApiTypes/Keys";
import { GetResponse } from "./ApiTypes/Get";
import { Unix } from "./Unix";
import { IndexedDBWrap } from "./IndexedDBWrap";
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
export interface JormunRemoteKeyComparison
{
    download: boolean, 
    upload: boolean, 
    missingLocal : Key[], 
    missingRemote : Key[], 
    newerLocal : Key[], 
    newerRemote : Key[], 
    newShared : Key[], 
    deleteShared : Key[],
    localVersion : string,
    remoteVersion : string
}

export type AlertContent = {title : string, message : string, options : string[]};
export type AlertDelegate = (obj : AlertContent) => Promise<number>;
export type JormunEventPayload = {key : Key, data : Data, value : any, raw : LocalData};

/** Main object for interacting with Jormun.  */
export class Jormun
{
    private REMOTE_SETTINGS_KEY : Key;
    public static readonly CHANGED_KEYS_KEY : string = "CHANGED_KEYS";

    private alertDelegate : AlertDelegate;

    private options : JormunOptions;
    private local : ILocal;
    private remote : IRemote;
    private data : JormunDataUsers;

    public onDataChange : {[key : string] : JormunEvent<JormunEventPayload>} = {};
    /** Subscribe to this event to be notified when a sync starts and stops. */
    public onSync = new JormunEvent<boolean>();
    /** Subscribe to this event to be notified whenever this instance is setup again. */
    public onSetup = new JormunEvent<void>();

    /** Initialize this jormun instance with the specified app, and alert handler.
     * Will automatically load saved remote settings.
     */
    public async initialize(app : string, alertDelegate : AlertDelegate | null, memoryOnly : boolean = false)
    {
        if(memoryOnly)
            this.local = new MemoryStorage();
        else if(await IndexedDBWrap.isAvailable(app))
            this.local = new IndexedDBWrap(app);
        else if(LocalStorageWrap.isAvailable())
            this.local = new LocalStorageWrap();
        else
            this.local = new MemoryStorage();

        this.alertDelegate = alertDelegate ?? Jormun.defaultAlertDelegate;

        this.REMOTE_SETTINGS_KEY = new Key(app, -9999, "REMOTE_SETTINGS");
        this.data = {};
        await this.setup({app:app, remote : await this.local.getValue(this.REMOTE_SETTINGS_KEY)});
    }
    /** Get an interface to interact anonymously with the specified app on the specified host. */
    public static async getAnonymousRemote(app : string, host : string) : Promise<IAnonymousRemote>
    {
        const jormun = new Jormun();
        await jormun.initialize(app, null, true);
        await jormun.login({host: host, username : "", password : "", token : "", downloadSharedData : false});
        return jormun.getRemote();
    }
    public getApp() : string
    {
        return this.options.app;
    }
    /** Gets an interface to interact with the current remote. */
    public getRemote() : IPublicRemote
    {
        return this.remote;
    }
    /** Post an alert using the provided alert handler. */
    public async alert(title : string, message : string)
    {
        await this.alertDelegate({title : title, message: message, options : []});
    }
    /** Ask the user a question using the provided alert handler. Returns the index of the option chosen. */
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

        if(this.remote && await this.remote.loggedIn())
        {
            let forceDownload = false;
            if((await this.local.getKeys()).length <= 1)
            {
                forceDownload = true;
            }
            else if(oldRemote && (oldRemote.username != options.remote?.username || oldRemote.host != options.remote?.host))
            {
                const response = await this.ask("New User", `You seem to have switched from user ${oldRemote.username}@${oldRemote.host} to ${options.remote.username}@${options.remote.host}. Would you like to clear local data and redownload from ${options.remote.username}?`, ["Yes", "No"]);
                forceDownload = response == 0;
            }
            else if(!oldRemote && !(await this.isLocalDirty()).isDirty)
            {
                forceDownload = true;
            }
            await this.sync(forceDownload);
        }
    }
    /** Login to the specified remote. "token" does not need to have a value. */
    public async login(remote : JormunRemote)
    {
        remote.password = sha512(remote.password);
        if(!remote.host.startsWith("http"))
            remote.host = `https://${remote.host}`;
        await this.setup({app:this.options.app, remote : remote});
    }
    /** Returns the saved remote settings including the auth token, but not the password. */
    public hashedRemote = async () : Promise<JormunRemote> => await this.local.getValue(this.REMOTE_SETTINGS_KEY);

    /** Initiates a sync. If a conflict occurs, the user will be prompted to resolve it using the alert handler. If forceDownload is true, automatically clears local data and redownloads it. */
    public async sync(forceDownload = false)
    {
        if(!this.remote || !(await this.remote.loggedIn()))
            return;

        this.onSync.trigger(true);

        if(forceDownload)
        {
            for(const fragment of this.fragments(0))
            {
                await this.me(fragment)?.remove();
            }
        }

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
                        `Local (${comparison.localVersion})`, 
                        `Remote (${comparison.remoteVersion})`, 
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

        const changedKeys = this.me(Jormun.CHANGED_KEYS_KEY);
        if(changedKeys)
        {
            const changedKeysRaw = await changedKeys.getRaw();
            await changedKeys.preset(changedKeysRaw.timestamp, changedKeysRaw.timestamp, changedKeys.isPublished(), false);
        }

        this.onSync.trigger(false);
    }
    private async compareRemoteKeys(status : StatusResponse, remoteKeys : KeysResponse) : Promise<JormunRemoteKeyComparison>
    {
        this.add(Jormun.CHANGED_KEYS_KEY, Unix());

        let missingLocal : Key[] = []; //Keys that exist on remote but not on local
        let missingRemote : Key[] = []; //Keys that exist on local but not on remote
        let newerLocal : Key[] = []; //Keys that are newer on local
        let newerRemote : Key[] = []; //Keys that are newer on remote

        let newShared : Key[] = []; //Shared keys that are newer on remote
        let deleteShared : Key[] = []; //Shared keys that exist on local but not on remote

        let localVersionTime = 0;
        let localVersionDirty = false;
        let remoteVersionTime = 0;

        const raws : {[key : string] : LocalData} = {};
        
        if(status && remoteKeys)
        {
            for(const key in remoteKeys)
            {
                const parsed = Key.parse(key, status.userId);
                const remoteParsed = Key.parse(key, -1);
                const local = remoteParsed.userId == status.userId;
                const remoteTime = remoteKeys[key].timestamp;
                remoteVersionTime = Math.max(remoteTime, remoteVersionTime);
                if(!this.data.hasOwnProperty(parsed.userId) || !this.data[parsed.userId].hasOwnProperty(parsed.fragment))
                {
                    (local ? missingLocal : newShared).push(parsed);
                }
                else
                {
                    const raw = await this.data[parsed.userId][parsed.fragment].getRaw();
                    raws[parsed.stringifyLocal()] = raw;
                    if(local && (raw?.isDirty ?? false))
                    {
                        newerLocal.push(parsed);
                    }
                    const localTime = raw?.timestamp ?? 0;
                    if(remoteTime != localTime) //Local time should never be newer than remote time, so if different, consider remote to be newer.
                    {
                        (local ? newerRemote : newShared).push(parsed);
                    }
                }
            }
            for(const user in this.data)
            {
                for(const fragment in this.data[user])
                {
                    const key = this.data[user][fragment].getKey();
                    const raw = raws[key.stringifyLocal()] ?? await this.data[user][fragment].getRaw();
                    localVersionDirty = localVersionDirty || (raw?.isDirty ?? false);
                    localVersionTime = Math.max(localVersionTime, raw.timestamp);
                    if(remoteKeys && !remoteKeys.hasOwnProperty(key.stringifyRemote(status?.userId ?? -1)))
                    {
                        if(user == "0")
                        {
                            if(raw.isDirty)
                                newerLocal.push(key);
                            else
                                missingRemote.push(key);
                        }
                        else
                        {
                            deleteShared.push(key);
                        }
                    }
                }
            }
            for(const fragment in this.data[status.userId])
            {
                //We should only have keys from our actual userId stored as an artifact of
                //keys shared with us, when logged in as another user. Just delete them now.
                deleteShared.push(this.data[status.userId][fragment].getKey());
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

        return {download: download, upload: upload, missingLocal : missingLocal, missingRemote : missingRemote, newerLocal : newerLocal, newerRemote : newerRemote, newShared : newShared, deleteShared : deleteShared, localVersion: this.timeToVersion(localVersionTime, localVersionDirty), remoteVersion : this.timeToVersion(remoteVersionTime, false)};
    }
    private timeToVersion(time : number, dirty : boolean)
    {
        const date = new Date(time);
        const str = `${date.getFullYear().toString().substr(2)}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}${dirty?`:new`:""}`;
        return str;
    }
    /** Queries the remote and returns a comparison of keys. */
    public async different() : Promise<{different : boolean, comparison : JormunRemoteKeyComparison | null}>
    {
        if(!this.remote || !(await this.remote.loggedIn()))
            return {different : false, comparison : null};
        const status = await this.remote.status();
        const keys = await this.remote.keys();
        this.setSharedWith(status, keys);
        const comparison = await this.compareRemoteKeys(status, keys);
        return {different : comparison.download || comparison.upload, comparison : comparison};
    }
    public async isLocalDirty() : Promise<{isDirty : boolean, localVersion : string}>
    {
        let newest = 0;
        let dirty = false;
        if(this.data.hasOwnProperty("0"))
        {
            for(const fragment in this.data[0])
            {
                const raw = await this.data[0][fragment].getRaw();
                if(raw)
                {
                    if(raw.isDirty)
                        dirty = true;
                    if(raw.timestamp > newest)
                        newest = raw.timestamp;
                }
            }
        }
        const version = this.timeToVersion(newest, dirty);
        return {isDirty : dirty, localVersion : version};
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
                if(raw)
                {
                    await data.preset(JSON.parse(raw.json), raw.timestamp, keys[key].public, raw.isDirty);
                }
                data.setSharedWith(keys[key].sharedWith, status.userId); 
            }
        }
    }
    /** Add a new data entry with the specified fragment and specified default value. */
    public async add(fragment : string, defaultValue : any) : Promise<Data>
    {
        if(!this.data.hasOwnProperty(0))
            this.data[0] = {};
        if(!this.data[0].hasOwnProperty(fragment))
        {
            this.data[0][fragment] = new Data(this, new Key(this.options.app, 0, fragment));
            await this.data[0][fragment].preset(defaultValue, -Unix(), "private", true); 
            await this.bumpChangedKeys();
        }
        return this.data[0][fragment];
    }
    /** Get a piece of data owned by the local user. */
    public me(fragment : string) : Data
    {
        if(!this.data.hasOwnProperty(0))
            return null;
        return this.data[0][fragment] ?? null;
    }
    /** Get a piece of data owned by another user, but shared with the local user. */
    public user(userId : number | string, fragment : string) : Data
    {
        if(!this.data.hasOwnProperty(userId))
            return null;
        return this.data[userId][fragment] ?? null;
    }
    /** Called automatically to indicate that a piece of data has been deleted or created. */
    public async bumpChangedKeys()
    {
        await (await this.add(Jormun.CHANGED_KEYS_KEY, Unix())).set(Unix());
    }
    /** Returns a list of user ids we have data from locally. The local user is always 0. */
    public users() : number[]
    {
        const users : number[] = [];
        for(const userId in this.data)
        {
            users.push(parseInt(userId));
        }
        return users;
    }
    /** Returns a list of local fragments. */
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
    /* Returns a dictionary of users who shared data with us or whom we shared data with, mapping user ids and usernames. */
    public friends() : {[id : number] : string}
    {
        return this.remote?.cachedStatus()?.friends;
    }
    /** Export all the local data to a string. */
    public async export()
    {
        const obj = {};
        for(const fragment of this.fragments(0))
        {
            obj[fragment] = await this.me(fragment)?.get();
        }
        return JSON.stringify(obj);
    }
    /** Clear local data and import it from the specified string (should be created with the export method.) */
    public async import(data : string)
    {
        if(await this.ask("Import new data?", "Do you want to import this data? This will clear your current local data.", ["Yes", "No"]) != 0)
            return;
        try
        {
            const obj = JSON.parse(data);
            for(const fragment of this.fragments(0))
            {
                await this.me(fragment)?.remove();
            }
            for(const fragment in obj)
            {
                await this.add(fragment, obj[fragment]);
            }
            this.alert("Import success!", "");
        }
        catch(e)
        {
            this.alert("Import failed", e);
        }
    }
}