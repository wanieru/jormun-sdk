import { Key } from "./Key";
export interface LocalData {
    timestamp: number;
    isDirty: boolean;
    json: string;
}
export declare class Data {
    private key;
    constructor(key: Key);
    sync(): Promise<void>;
    getRaw(): Promise<LocalData>;
    get(): Promise<any>;
    preset(value: any, timestamp: number, isDirty: boolean): Promise<void>;
    set(value: any): Promise<void>;
    setAndSync(value: any): Promise<void>;
    remove(): Promise<void>;
    getKey: () => Key;
    getFragment: () => string;
}
