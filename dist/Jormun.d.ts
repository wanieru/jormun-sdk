import { ILocal } from "./ILocal";
import { IRemote } from "./IRemote";
import { Data } from "./Data";
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
declare type AlertDelegate = (message: string, options: string[]) => Promise<number>;
export declare class Jormun {
    private static REMOTE_SETTINGS_KEY;
    private static alertDelegate;
    private static options;
    static local: ILocal;
    static remote: IRemote;
    private static data;
    static initialize(app: string): Promise<void>;
    static login(remote: JormunRemote): Promise<void>;
    static sync(): Promise<void>;
    private static setup;
    static hashedRemote: () => Promise<any>;
    static alert(message: string): Promise<number>;
    static setAlertDelegate(resolver: AlertDelegate): void;
}
export {};
