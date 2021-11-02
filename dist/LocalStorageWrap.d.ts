import { ILocal } from "./ILocal";
import { Key } from "./Key";
export declare class LocalStorageWrap implements ILocal {
    static isAvailable(): boolean;
    private static KEYS_KEY;
    private static VER_KEY;
    private keys;
    private version;
    constructor();
    private migrate;
    private addKey;
    private removeKey;
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
