import { ILocal } from "./ILocal";
import { Key } from "./Key";
export declare class MemoryStorage implements ILocal {
    private data;
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
