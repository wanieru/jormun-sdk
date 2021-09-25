export interface ILocal
{
    getFragments() : {[fragment : string] : {timestamp : number, isDirty : boolean}};
    getSharedKeys() : {[key : string] : {timestamp : number}};
    setValue(key : string, value : string);
}