import { DataResponse, IRemote, KeyResponse, StatusResponse } from "./IRemote";
import { JormunOptions } from "./Jormun";
import { Key } from "./Key";

export class JomrunSyncRemote implements IRemote
{
    private jormunOptions : JormunOptions;
    private statusCache : StatusResponse;

    public constructor(jormunOptions : JormunOptions)
    {
        this.jormunOptions = jormunOptions;
    }

    public cachedStatus(): StatusResponse 
    {
        return this.statusCache;
    }
    public async status(): Promise<StatusResponse> 
    {
        throw new Error("Method not implemented.");
    }
    public async keys(): Promise<KeyResponse> 
    {
        throw new Error("Method not implemented.");
    }
    public async get(keys: Key[]): Promise<DataResponse> 
    {
        throw new Error("Method not implemented.");
    }
    public async set(data: DataResponse): Promise<KeyResponse> 
    {
        throw new Error("Method not implemented.");
    }
    public async delete(keys: Key[]): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
    
}