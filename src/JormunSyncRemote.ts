import { Ajax } from "./Ajax";
import { DeleteRequest, DeleteResponse } from "./ApiTypes/Delete";
import { GetRequest, GetResponse } from "./ApiTypes/Get";
import { KeysRequest, KeysResponse } from "./ApiTypes/Keys";
import { SetRequest, SetResponse } from "./ApiTypes/Set";
import { StatusRequest, StatusResponse } from "./ApiTypes/Status";
import { IRemote } from "./IRemote";
import { Jormun, JormunOptions } from "./Jormun";
import { Key } from "./Key";

export class JomrunSyncRemote implements IRemote
{
    private jormunOptions : JormunOptions;
    private statusCache : StatusResponse;

    public constructor(jormunOptions : JormunOptions)
    {
        this.jormunOptions = jormunOptions;
    }

    private async request<TRequest, TResponse>(endpoint : string, data : TRequest) : Promise<TResponse>
    {
        const uri = this.jormunOptions.remote.host + "/" + endpoint;
        const response = await Ajax(uri, data);
        if(response.status != 200)
        {
            await Jormun.alert(`${uri} returned ${response.status}: ${response.body.message}`);
            return null;
        }
        return response.body;
    }
    private baseRequest()
    {
        return {username: this.jormunOptions.remote.username, password: this.jormunOptions.remote.password, app: this.jormunOptions.app};
    }

    public cachedStatus(): StatusResponse 
    {
        return this.statusCache;
    }
    public async status(): Promise<StatusResponse> 
    {
        const response = await this.request<StatusRequest, StatusResponse>("status", this.baseRequest());
        if(response == null)
            return null;
        this.statusCache = response;
        return response;
    }
    public async keys(): Promise<KeysResponse> 
    {
        const response : KeysResponse = await this.request<KeysRequest, KeysResponse>("keys", this.baseRequest());
        if(response == null)
            return null;
        return response;
    }
    public async get(keys: Key[]): Promise<GetResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;

        const response : GetResponse = await this.request<GetRequest, GetResponse>("get", request);
        if(response == null)
            return null;
        return response;
    }
    public async set(data: GetResponse): Promise<SetResponse> 
    {
        const request = this.baseRequest();
        request["data"] = data;

        const response = await this.request<SetRequest, SetResponse>("set", request);
        if(response == null)
            return null;
        return response;
    }
    public async delete(keys: Key[]): Promise<void> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;

        await this.request<DeleteRequest, DeleteResponse>("delete", request);
    }
    
}