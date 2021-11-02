import { ILocal } from "./ILocal";
import { Key } from "./Key";
export declare class IndexedDBWrap implements ILocal {
    static isAvailable: (app: string) => Promise<boolean>;
    private app;
    private _db;
    constructor(app: string);
    private migrate;
    private db;
    private createDb;
    private request;
    getKeys(): Promise<Key[]>;
    setValue(key: Key, value: any): Promise<void>;
    setValues(data: {
        [key: string]: any;
    }): Promise<void>;
    getValue(key: Key): Promise<any>;
    getValues(keys: Key[]): Promise<{
        [key: string]: any;
    }>;
    removeValue(key: Key): Promise<void>;
}
