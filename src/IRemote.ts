import { GetResponse } from "./ApiTypes/Get";
import { KeysResponse } from "./ApiTypes/Keys";
import { SetResponse } from "./ApiTypes/Set";
import { StatusResponse } from "./ApiTypes/Status";
import { Key } from "./Key";

export interface IRemote
{
    cachedStatus() : StatusResponse;
    status() : Promise<StatusResponse>;
    keys() : Promise<KeysResponse>;
    get(keys : Key[]) : Promise<GetResponse>;
    set(data : GetResponse) : Promise<SetResponse>;
    delete(keys : Key[]) : Promise<void>;
}