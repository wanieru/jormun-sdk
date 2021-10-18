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
export interface JormunDataSet {
    [fragment: string]: Data;
}
export declare type AlertContent = {
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
    alert(message: string): Promise<void>;
    ask(message: string, options: string[]): Promise<number>;
    private setup;
    login(remote: JormunRemote): Promise<void>;
    hashedRemote: () => Promise<JormunRemote>;
    sync(): Promise<void>;
    private compareRemoteKeys;
    different(): Promise<boolean>;
    private getUploadData;
    private removeLocalKeys;
    private processDataResponse;
    add(fragment: string, defaultValue: any): Promise<Data>;
    me(fragment: string): Data;
    user(userId: number, fragment: string): Data;
    getData(): {
        [id: number]: JormunDataSet;
    };
    private static defaultAlertDelegate;
    friends(): {
        [id: number]: string;
    };
}
