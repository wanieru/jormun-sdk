import { DataResponse, KeysResponse, StatusResponse } from "./ApiTypes";
import { Key } from "./Key";

export interface IRemote
{
    cachedStatus() : StatusResponse;
    status() : Promise<StatusResponse>;
    keys() : Promise<KeysResponse>;
    get(keys : Key[]) : Promise<DataResponse>;
    set(data : DataResponse) : Promise<KeysResponse>;
    delete(keys : Key[]) : Promise<void>;
}