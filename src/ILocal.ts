export interface ILocal
{
    getLocalFragments() : Promise<{[fragment : string] : {timestamp : number, isDirty : boolean}}>;
    getSharedKeys() : Promise<{[key : string] : {timestamp : number}}>;
    setValue(key : string, value : any) : Promise<void>;
    setValues(data : {[key : string] : any}) : Promise<void>;
    getValue(key : string) : Promise<any>;
    getValues(keys : string[]) : Promise<{[key : string] : any}>;
}