import {sha512} from "js-sha512";
import { Ajax } from "./Ajax";
import { BanRequest, BanResponse } from "./ApiTypes/Ban";
import { BrowseRequest, BrowseResponse } from "./ApiTypes/Browse";
import { DeleteRequest, DeleteResponse } from "./ApiTypes/Delete";
import { EmptyRequest, EmptyResponse } from "./ApiTypes/Empty";
import { GetRequest, GetResponse } from "./ApiTypes/Get";
import { KeysRequest, KeysResponse } from "./ApiTypes/Keys";
import { LeaveRequest, LeaveResponse } from "./ApiTypes/Leave";
import { LoginRequest, LoginResponse } from "./ApiTypes/Login";
import { LogoutRequest, LogoutResponse } from "./ApiTypes/Logout";
import { PasswordRequest, PasswordResponse } from "./ApiTypes/Password";
import { PeekResponse } from "./ApiTypes/Peek";
import { PublishRequest, PublishResponse } from "./ApiTypes/Publish";
import { RegisterRequest, RegisterResponse } from "./ApiTypes/Register";
import { RenameRequest, RenameResponse } from "./ApiTypes/Rename";
import { ResizeRequest, ResizeResponse } from "./ApiTypes/Resize";
import { SetRequest, SetResponse } from "./ApiTypes/Set";
import { SetupRequest, SetupResponse } from "./ApiTypes/Setup";
import { ShareRequest, ShareResponse } from "./ApiTypes/Share";
import { StatusRequest, StatusResponse } from "./ApiTypes/Status";
import { UnpublishRequest, UnpublishResponse } from "./ApiTypes/Unpublish";
import { UnshareRequest, UnshareResponse } from "./ApiTypes/Unshare";
import { UsersRequest, UsersResponse } from "./ApiTypes/Users";
import { IRemote } from "./IRemote";
import { Jormun, JormunOptions, JormunRemote } from "./Jormun";
import { Key } from "./Key";

export class JormunSyncRemote implements IRemote
{
    private jormun : Jormun;
    public jormunOptions : JormunOptions;
    private statusCache : StatusResponse;

    private isLoggedIn : boolean;
    private isConnected : boolean;

    public constructor(jormun : Jormun, jormunOptions : JormunOptions)
    {
        this.jormun = jormun;
        this.jormunOptions = jormunOptions;
        this.checkConnection();
    }
    public async checkConnection()
    {
        if(!this.statusCache)
        {
            if(this.jormunOptions.remote.password)
            {
                const login = await this.login();
                this.jormunOptions.remote.token = login.token;
                this.jormunOptions.remote.password = null;
            }
            this.isConnected = !!(await this.empty());
            this.isLoggedIn = !!(await this.status());
        }
    }

    private async request<TRequest, TResponse>(endpoint : string, data : TRequest) : Promise<TResponse>
    {
        const uri = this.jormunOptions.remote.host + "/api/" + endpoint;
        const response = await Ajax(uri, data).catch(e => this.jormun.alert(e));
        if(response)
        {
            if(response == null)
            {
                return null;
            }
            if(response.status != 200)
            {
                await this.jormun.alert(`${uri} returned ${response.status}: ${response.body.message ?? ""}`);
                return null;
            }
            return response.body;
        }
    }
    private baseRequest()
    {
        return {username: this.jormunOptions.remote.username, token: this.jormunOptions.remote.token, app: this.jormunOptions.app};
    }
    private adminRequest()
    {
        return {username: this.jormunOptions.remote.username, token: this.jormunOptions.remote.token};
    }
    private passwordRequest()
    {
        return {username: this.jormunOptions.remote.username, password: this.jormunOptions.remote.password, app: this.jormunOptions.app};
    }


    public cachedStatus(): StatusResponse 
    {
        return this.statusCache;
    }
    public async loggedIn() : Promise<boolean>
    {
        await this.checkConnection();
        return this.isLoggedIn;
    }
    public async connected() : Promise<boolean>
    {
        await this.checkConnection();
        return this.isConnected;
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
    public async password(password : string, newPassword: string): Promise<PasswordResponse> 
    {
        newPassword = sha512(newPassword);
        const request = this.adminRequest();
        request["password"] = password;
        request["newPassword"] = newPassword;

        return await this.request<PasswordRequest, PasswordResponse>("password", request);
    }
    public async register(newUsername: string, newPassword: string, size : number, isAdmin : boolean): Promise<RegisterResponse> 
    {
        newPassword = sha512(newPassword);
        const request = this.adminRequest();
        request["newUsername"] = newUsername;
        request["newPassword"] = newPassword;
        request["size"] = size;
        request["isAdmin"] = isAdmin;

        return await this.request<RegisterRequest , RegisterResponse>("register", request);
    }
    public async empty(): Promise<EmptyResponse> 
    {
        return await this.request<EmptyRequest, EmptyResponse>("empty", {});
    }
    public async setup(username: string, password: string): Promise<SetupResponse> 
    {
        password = sha512(password);
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
    
    public async browse(limit: number, offset: number): Promise<BrowseResponse> 
    {
        return await this.request<BrowseRequest, BrowseResponse>("browse", {app: this.jormunOptions.app, limit: limit, offset: offset});
    }
    public async publish(keys: Key[]): Promise<PublishResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;

        return await this.request<PublishRequest, PublishResponse>("publish", request);
    }
    public async unpublish(keys: Key[]): Promise<UnpublishResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(this.statusCache.userId));
        }
        const request = this.baseRequest();
        request["keys"] = array;

        return await this.request<UnpublishRequest, UnpublishResponse>("unpublish", request);
    }
    public async peek(keys: Key[]): Promise<PeekResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(-1));
        }
        return await this.request<GetRequest, GetResponse>("peek", {app: this.jormunOptions.app, keys : array});
    }
    public async login() : Promise<LoginResponse>
    {
        const request = this.passwordRequest();
        return await this.request<LoginRequest, LoginResponse>("login", request);
    }
    public async logout() : Promise<LogoutResponse>
    {
        const request = this.baseRequest();
        return await this.request<LogoutRequest, LogoutResponse>("logout", request);
    }
}