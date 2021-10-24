import { ILocal } from "./ILocal";
import { IRemote } from "./IRemote";
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
    raw: LocalData;
};
export declare class Jormun {
    private REMOTE_SETTINGS_KEY;
    static readonly CHANGED_KEYS_KEY: string;
    private alertDelegate;
    private options;
    local: ILocal;
    remote: IRemote;
    private data;
    onDataChange: {
        [key: string]: JormunEvent<JormunEventPayload>;
    };
    onSync: JormunEvent<boolean>;
    onSetup: JormunEvent<void>;
    initialize(app: string, alertDelegate: AlertDelegate | null, memoryOnly?: boolean): Promise<void>;
    alert(title: string, message: string): Promise<void>;
    ask(title: string, message: string, options: string[]): Promise<number>;
    private setup;
    login(remote: JormunRemote): Promise<void>;
    hashedRemote: () => Promise<JormunRemote>;
    sync(forceDownload?: boolean): Promise<void>;
    private compareRemoteKeys;
    different(): Promise<boolean>;
    private getUploadData;
    private removeLocalKeys;
    private processDataResponse;
    private setSharedWith;
    add(fragment: string, defaultValue: any): Promise<Data>;
    me(fragment: string): Data;
    user(userId: number | string, fragment: string): Data;
    bumpChangedKeys(): Promise<void>;
    users(): number[];
    fragments(userId: number | string): string[];
    private static defaultAlertDelegate;
    friends(): {
        [id: number]: string;
    };
}
