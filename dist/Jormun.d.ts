import { ILocal } from "./ILocal";
import { IAnonymousRemote, IPublicRemote } from "./IRemote";
import { Data, LocalData } from "./Data";
import { Key } from "./Key";
import { JormunEvent } from "./Event";
export interface JormunOptions {
    app: string;
    remote?: JormunRemote;
}
export interface JormunRemote {
    host: string;
    username: string;
    password: string;
    token: string;
    downloadSharedData: boolean;
}
export interface JormunDataUsers {
    [id: number]: JormunDataSet;
}
export interface JormunDataSet {
    [fragment: string]: Data;
}
export interface JormunRemoteKeyComparison {
    download: boolean;
    upload: boolean;
    missingLocal: Key[];
    missingRemote: Key[];
    newerLocal: Key[];
    newerRemote: Key[];
    newShared: Key[];
    deleteShared: Key[];
    localVersion: string;
    remoteVersion: string;
}
export declare class JormunStatus {
    initialized: boolean;
    connected: boolean;
    loggedIn: boolean;
    empty: boolean;
    syncing: boolean;
    admin: boolean;
}
export declare type AlertContent = {
    title: string;
    message: string;
    options: string[];
};
export declare type AlertDelegate = (obj: AlertContent) => Promise<number>;
export declare type JormunEventPayload = {
    key: Key;
    data: Data;
    value: any;
    raw: LocalData | null;
};
/** Main object for interacting with Jormun.  */
export declare class Jormun {
    private REMOTE_SETTINGS_KEY;
    static readonly CHANGED_KEYS_KEY: string;
    private alertDelegate;
    private options;
    private local;
    private remote;
    private data;
    private status;
    private onDataChange;
    /** Subscribe to this event to be notified when any data changes. */
    onAnyDataChange: JormunEvent<JormunEventPayload>;
    /** Subscribe to this event to be notified when a sync starts and stops. */
    onSync: JormunEvent<boolean>;
    /** Subscribe to this event to be notified whenever this instance is setup again. */
    onSetup: JormunEvent<void>;
    /** Initialize this jormun instance with the specified app, and alert handler.
     * Will automatically load saved remote settings.
     */
    initialize(app: string, alertDelegate: AlertDelegate | null, localStorageOverride?: ILocal | null): Promise<void>;
    /** Get an interface to interact anonymously with the specified app on the specified host. */
    static getAnonymousRemote(app: string, host: string, alertDelegate: AlertDelegate | null): Promise<IAnonymousRemote>;
    getApp(): string;
    /** Gets an interface to interact with the current remote. */
    getRemote(): IPublicRemote;
    /** Post an alert using the provided alert handler. */
    alert(title: string, message: string): Promise<void>;
    /** Ask the user a question using the provided alert handler. Returns the index of the option chosen. */
    ask(title: string, message: string, options: string[]): Promise<number>;
    private setup;
    /** Login to the specified remote. "token" does not need to have a value. */
    login(remote: JormunRemote): Promise<void>;
    /** Returns the saved remote settings including the auth token, but not the password. */
    hashedRemote: () => Promise<JormunRemote>;
    /** Initiates a sync. If a conflict occurs, the user will be prompted to resolve it using the alert handler. If forceDownload is true, automatically clears local data and redownloads it. */
    sync(forceDownload?: boolean): Promise<void>;
    private compareRemoteKeys;
    private timeToVersion;
    /** Queries the remote and returns a comparison of keys. */
    different(): Promise<{
        different: boolean;
        comparison: JormunRemoteKeyComparison | null;
    }>;
    isLocalDirty(): Promise<{
        isDirty: boolean;
        localVersion: string;
    }>;
    private getUploadData;
    private removeLocalKeys;
    private processDataResponse;
    private setSharedWith;
    /** Add a new data entry with the specified fragment and specified default value. */
    add(fragment: string, defaultValue: any): Promise<Data>;
    /** Get a piece of data owned by the local user. */
    me(fragment: string): Data | null;
    /** Get a piece of data owned by another user, but shared with the local user. */
    user(userId: number | string, fragment: string): Data | null;
    /** Called automatically to indicate that a piece of data has been deleted or created. */
    bumpChangedKeys(): Promise<void>;
    /** Returns a list of user ids we have data from locally. The local user is always 0. */
    users(): number[];
    /** Returns a list of local fragments. */
    fragments(userId: number | string): string[];
    private static defaultAlertDelegate;
    friends(): {
        [id: number]: string;
    } | null;
    /** Export all the local data to a string. */
    export(): Promise<string>;
    /** Clear local data and import it from the specified string (should be created with the export method.) */
    import(data: string): Promise<void>;
    getStatus(): JormunStatus;
}
