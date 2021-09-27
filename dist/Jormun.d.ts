import { ILocal } from "./ILocal";
import { IRemote } from "./IRemote";
import { Data, LocalData } from "./Data";
import { Key } from "./Key";
import { JormunEvent } from "./Event";
export interface JormunOptions {
    app: string;
    type: "LocalOnly" | "LocalAndRemote";
    remote?: JormunRemote;
}
export interface JormunRemote {
    host: string;
    username: string;
    password: string;
    downloadSharedData: boolean;
}
export interface JormunDataSet {
    [fragment: string]: Data;
}
export declare type AlertDelegate = (message: string, options: string[]) => Promise<number>;
export declare type JormunEventPayload = {
    key: Key;
    data: Data;
    value: any;
    raw: LocalData;
};
export declare class Jormun {
    private static REMOTE_SETTINGS_KEY;
    private static alertDelegate;
    private static options;
    static local: ILocal;
    static remote: IRemote;
    private static data;
    static onDataChange: {
        [key: string]: JormunEvent<JormunEventPayload>;
    };
    static onSync: JormunEvent<boolean>;
    static initialize(app: string, alertDelegate: AlertDelegate): Promise<void>;
    static login(remote: JormunRemote): Promise<void>;
    static sync(): Promise<void>;
    private static getUploadData;
    private static removeLocalKeys;
    private static processDataResponse;
    private static compareRemoteKeys;
    private static setup;
    static hashedRemote: () => Promise<any>;
    static alert(message: string): Promise<void>;
    static ask(message: string, options: string[]): Promise<number>;
    static me(): JormunDataSet;
    static user(userId: number): JormunDataSet;
}
