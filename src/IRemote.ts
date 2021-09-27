import { DataResponse, KeyResponse, StatusResponse } from "./ApiTypes";
import { Key } from "./Key";

export interface IRemote
{
    cachedStatus() : StatusResponse;
    status() : Promise<StatusResponse>;
    keys() : Promise<KeyResponse>;
    get(keys : Key[]) : Promise<DataResponse>;
    set(data : DataResponse) : Promise<KeyResponse>;
    delete(keys : Key[]) : Promise<void>;
}