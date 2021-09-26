import { Key } from "./Key";

export interface ILocal
{
    getKeys() : Promise<Key[]>;
    setValue(key : Key, value : any) : Promise<void>;
    setValues(data : {[key : string] : any}) : Promise<void>;
    getValue(key : Key) : Promise<any>;
    getValues(keys : Key[]) : Promise<{[key : string] : any}>;
    removeValue(key : Key) : Promise<void>;
}