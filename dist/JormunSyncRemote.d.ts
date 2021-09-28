import { GetResponse } from "./ApiTypes/Get";
import { KeysResponse } from "./ApiTypes/Keys";
import { SetResponse } from "./ApiTypes/Set";
import { StatusResponse } from "./ApiTypes/Status";
import { IRemote } from "./IRemote";
import { JormunOptions } from "./Jormun";
import { Key } from "./Key";
export declare class JomrunSyncRemote implements IRemote {
    private jormunOptions;
    private statusCache;
    constructor(jormunOptions: JormunOptions);
    private request;
    private baseRequest;
    cachedStatus(): StatusResponse;
    status(): Promise<StatusResponse>;
    keys(): Promise<KeysResponse>;
    get(keys: Key[]): Promise<GetResponse>;
    set(data: GetResponse): Promise<SetResponse>;
    delete(keys: Key[]): Promise<void>;
}
