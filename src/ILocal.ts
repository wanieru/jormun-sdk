import { Key } from "./Key";

export interface ILocal
{
    getLocalFragments() : Promise<{[key : string] : {timestamp : number, isDirty : boolean}}>;
    getSharedKeys() : Promise<{[userId : number] : {[key : string] : {timestamp : number}}}>;
    setValue(key : Key, value : any) : Promise<void>;
    setValues(data : {[key : string] : any}) : Promise<void>;
    getValue(key : Key) : Promise<any>;
    getValues(keys : Key[]) : Promise<{[key : string] : any}>;
}