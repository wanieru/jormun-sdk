import { DataResponse, IRemote, KeyResponse, StatusResponse } from "./IRemote";
import { JormunOptions } from "./Jormun";
import { Key } from "./Key";
export declare class JomrunSyncRemote implements IRemote {
    private jormunOptions;
    private statusCache;
    constructor(jormunOptions: JormunOptions);
    cachedStatus(): StatusResponse;
    status(): Promise<StatusResponse>;
    keys(): Promise<KeyResponse>;
    get(keys: Key[]): Promise<DataResponse>;
    set(data: DataResponse): Promise<KeyResponse>;
    delete(keys: Key[]): Promise<void>;
}
