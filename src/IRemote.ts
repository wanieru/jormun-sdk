import { Key } from "./Key";

export interface StatusResponse
{
    userId : number,
    isAdmin : boolean,
    storage : number,
    used : number
}
export interface KeyResponse
{
    [key : string] : number
}
export interface DataResponse
{
    [key : string] : any;
}
export interface IRemote
{
    cachedStatus() : StatusResponse;
    status() : Promise<StatusResponse>;
    keys() : Promise<KeyResponse>;
    get(keys : Key[]) : Promise<DataResponse>;
    set(data : DataResponse) : Promise<KeyResponse>;
    delete(keys : Key[]) : Promise<void>;
}