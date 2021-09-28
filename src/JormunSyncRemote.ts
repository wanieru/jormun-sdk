import { Ajax } from "./Ajax";
import { BanRequest, BanResponse } from "./ApiTypes/Ban";
import { DeleteRequest, DeleteResponse } from "./ApiTypes/Delete";
import { EmptyRequest, EmptyResponse } from "./ApiTypes/Empty";
import { GetRequest, GetResponse } from "./ApiTypes/Get";
import { KeysRequest, KeysResponse } from "./ApiTypes/Keys";
import { LeaveRequest, LeaveResponse } from "./ApiTypes/LEave";
import { PasswordRequest, PasswordResponse } from "./ApiTypes/Password";
import { RegisterRequest, RegisterResponse } from "./ApiTypes/Register";
import { RenameRequest, RenameResponse } from "./ApiTypes/Rename";
import { ResizeRequest, ResizeResponse } from "./ApiTypes/Resize";
import { SetRequest, SetResponse } from "./ApiTypes/Set";
import { SetupRequest, SetupResponse } from "./ApiTypes/Setup";
import { ShareRequest, ShareResponse } from "./ApiTypes/Share";
import { StatusRequest, StatusResponse } from "./ApiTypes/Status";
import { UnshareRequest, UnshareResponse } from "./ApiTypes/Unshare";
import { UsersRequest, UsersResponse } from "./ApiTypes/Users";
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
    private adminRequest()
    {
        return {username: this.jormunOptions.remote.username, password: this.jormunOptions.remote.password};
    }


    public cachedStatus(): StatusResponse 
    {
        return this.statusCache;
    }
    public async status(): Promise<StatusResponse> 
    {
        this.statusCache = await this.request<StatusRequest, StatusResponse>("status", this.baseRequest());
        return this.statusCache;
    }
    public async keys(): Promise<KeysResponse> 
    {
        return await this.request<KeysRequest, KeysResponse>("keys", this.baseRequest());
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

        return await this.request<GetRequest, GetResponse>("get", request);
    }
    public async set(data: GetResponse): Promise<SetResponse> 
    {
        const request = this.baseRequest();
        request["data"] = data;

        return await this.request<SetRequest, SetResponse>("set", request);
    }
    public async delete(keys: Key[]): Promise<DeleteResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;

        return await this.request<DeleteRequest, DeleteResponse>("delete", request);
    }
    
    public async share(keys: Key[], users: string[]): Promise<ShareResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;
        request["users"] = users;

        return await this.request<ShareRequest, ShareResponse>("share", request);
    }
    public async unshare(keys: Key[], users: string[]): Promise<UnshareResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;
        request["users"] = users;

        return await this.request<UnshareRequest, UnshareResponse>("unshare", request);
    }
    public async leave(keys: Key[]): Promise<LeaveResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;

        return await this.request<LeaveRequest, LeaveResponse>("leave", request);
    }
    public async password(newPassword: string): Promise<PasswordResponse> 
    {
        const request = this.adminRequest();
        request["newPassword"] = newPassword;

        return await this.request<PasswordRequest, PasswordResponse>("password", request);
    }
    public async register(newUsername: string, newPassword: string): Promise<RegisterResponse> 
    {
        const request = this.adminRequest();
        request["newUsername"] = newUsername;
        request["newPassword"] = newPassword;

        return await this.request<RegisterRequest , RegisterResponse>("register", request);
    }
    public async empty(): Promise<EmptyResponse> 
    {
        return await this.request<EmptyRequest, EmptyResponse>("empty", {});
    }
    public async setup(username: string, password: string): Promise<SetupResponse> 
    {
        const request = {username : username, password : password};
        return await this.request<SetupRequest, SetupResponse>("setup", request);
    }
    public async ban(bannedUsername: string): Promise<BanResponse> 
    {
        const request = this.adminRequest();
        request["bannedUsername"] = bannedUsername;

        return await this.request<BanRequest, BanResponse>("ban", request);
    }
    public async rename(oldUsername: string, newUsername: string): Promise<RenameResponse> 
    {
        const request = this.adminRequest();
        request["oldUsername"] = oldUsername;
        request["newUsername"] = newUsername;

        return await this.request<RenameRequest, RenameResponse>("rename", request);
    }
    public async resize(targetUsername: string, newSize: number): Promise<ResizeResponse> 
    {
        const request = this.adminRequest();
        request["targetUsername"] = targetUsername;
        request["newSize"] = newSize;

        return await this.request<ResizeRequest, ResizeResponse>("resize", request);
    }
    public async users(): Promise<UsersResponse> 
    {
        const request = this.adminRequest();
        return await this.request<UsersRequest, UsersResponse>("users", request);
    }
    
}