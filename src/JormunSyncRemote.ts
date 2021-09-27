import { Ajax } from "./Ajax";
import { DataResponse, KeyResponse, StatusResponse, StatusReuqest as StatusRequest } from "./ApiTypes";
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

    private async request(endpoint : string, data : object) : Promise<any>
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
        const request : StatusRequest = this.baseRequest();
        const response : StatusResponse = await this.request("status", request);
        if(response == null)
            return null;
        this.statusCache = response;
        return response;
    }
    public async keys(): Promise<KeyResponse> 
    {
        const response : KeyResponse = await this.request("keys", this.baseRequest());
        if(response == null)
            return null;
        return response;
    }
    public async get(keys: Key[]): Promise<DataResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;

        const response : DataResponse = await this.request("get", request);
        if(response == null)
            return null;
        return response;
    }
    public async set(data: DataResponse): Promise<KeyResponse> 
    {
        const request = this.baseRequest();
        request["data"] = data;

        const response : KeyResponse = await this.request("set", request);
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

        await this.request("delete", request);
    }
    
}