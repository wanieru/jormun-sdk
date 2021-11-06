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
import { Publicity, PublishRequest, PublishResponse } from "./ApiTypes/Publish";
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
import { Jormun, JormunOptions, JormunRemote } from "./Jormun";
import { Key } from "./Key";
import { Unix } from "./Unix";

export class JormunSyncRemote implements IRemote
{
    private jormun : Jormun;
    public jormunOptions : JormunOptions;
    private statusCache : StatusResponse;

    private isLoggedIn : boolean;
    private isConnected : boolean;
    private checkedConnection : boolean;
    private checkingConnection : Promise<void> | null = null;

    private cache : {[endpoint : string] : {timestamp : number, result: any}} = {};
    private cacheTime = 2000;

    public constructor(jormun : Jormun, jormunOptions : JormunOptions)
    {
        this.checkedConnection = false;
        this.jormun = jormun;
        this.jormunOptions = jormunOptions;
        this.checkConnection();
    }
    public async checkConnection()
    {
        if(this.checkingConnection != null)
        {
            await this.checkingConnection;
            return;
        }
        if(!this.checkedConnection)
        {
            let resolve : any = null;
            this.checkingConnection = new Promise<void>(r => resolve = r);

            const empty = await this.empty();
            this.isConnected = !!(empty);
            if(this.isConnected && !empty.empty && this.jormunOptions.remote.password && this.jormunOptions.remote.username)
            {
                const login = await this.login();
                this.jormunOptions.remote.token = login?.token ?? "";
                this.jormunOptions.remote.password = "";
            }
            this.isLoggedIn = this.isConnected && this.jormunOptions.remote.token && !!(await this.status());
            this.checkedConnection = true;

            resolve();
        }
    }
    private statusToString(status : number) : string
    {
        switch(status)
        {
            case 200: return "OK";
            case 400: return "Invalid Request";
            case 401: return "Invalid Login";
            case 413: return "Storage Space Exceeded";
            case 429: return "Too Many Requests - Please Wait A Bit";
            case 500: return "Server Error";
        }
        if(status.toString().startsWith("4")) return "OK";
        else return "Error";
    }
    private async request<TRequest, TResponse>(options : {endpoint : string, data : TRequest, hasParameters : boolean, hasSideEffects : boolean}) : Promise<TResponse>
    {
        if(!options.hasParameters && !options.hasSideEffects && this.cache.hasOwnProperty(options.endpoint) && Unix() - this.cache[options.endpoint].timestamp < this.cacheTime)
        {
            return this.cache[options.endpoint].result;
        }
        const uri = this.jormunOptions.remote.host + "/api/" + options.endpoint;
        try
        {
            const response = await Ajax(uri, options.data);
            if(response == null)
            {
                return null;
            }
            if(response.status != 200)
            {
                await this.jormun.alert(`${options.endpoint} ${response.status}`, `${this.statusToString(response.status)} ${response.body.message ? ` - ${response.body.message}` : ""}`);
                return null;
            }
            if(options.hasSideEffects)
                this.cache = {};
            if(!options.hasParameters && !options.hasSideEffects)
                this.cache[options.endpoint] = {timestamp : Unix(), result : response.body};
            return response.body;
        }
        catch(e)
        {
            this.jormun.alert("Network Error", e);
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
        this.statusCache = await this.request<StatusRequest, StatusResponse>({endpoint: "status", data: this.baseRequest(), hasSideEffects : false, hasParameters : false});
        return this.statusCache;
    }
    public async keys(): Promise<KeysResponse> 
    {
        return await this.request<KeysRequest, KeysResponse>({endpoint: "keys", data: this.baseRequest(), hasSideEffects: false, hasParameters: false});
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

        return await this.request<GetRequest, GetResponse>({endpoint: "get",data:  request, hasSideEffects: false, hasParameters: true});
    }
    public async set(data: GetResponse): Promise<SetResponse> 
    {
        const request = this.baseRequest();
        request["data"] = data;

        return await this.request<SetRequest, SetResponse>({endpoint: "set",data:  request, hasSideEffects: true, hasParameters: true});
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

        return await this.request<DeleteRequest, DeleteResponse>({endpoint: "delete", data: request, hasSideEffects: true, hasParameters: true});
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

        return await this.request<ShareRequest, ShareResponse>({endpoint: "share", data: request, hasSideEffects: true, hasParameters: true});
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

        return await this.request<UnshareRequest, UnshareResponse>({endpoint: "unshare",data:  request, hasSideEffects: true, hasParameters: true});
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

        return await this.request<LeaveRequest, LeaveResponse>({endpoint: "leave",data:  request, hasSideEffects: true, hasParameters: true});
    }
    public async password(password : string, newPassword: string): Promise<PasswordResponse> 
    {
        password = sha512(password);
        newPassword = sha512(newPassword);
        const request = this.adminRequest();
        request["password"] = password;
        request["newPassword"] = newPassword;

        return await this.request<PasswordRequest, PasswordResponse>({endpoint: "password",data:  request, hasSideEffects: true, hasParameters: true});
    }
    public async register(loggedInPassword : string, newUsername: string, newPassword: string, size : number, isAdmin : boolean): Promise<RegisterResponse> 
    {
        loggedInPassword = sha512(loggedInPassword);
        newPassword = sha512(newPassword);
        const request = this.adminRequest();
        request["newUsername"] = newUsername;
        request["newPassword"] = newPassword;
        request["size"] = size;
        request["isAdmin"] = isAdmin;
        request["password"] = loggedInPassword;

        return await this.request<RegisterRequest , RegisterResponse>({endpoint: "register", data: request, hasSideEffects: true, hasParameters: true});
    }
    public async empty(): Promise<EmptyResponse> 
    {
        return await this.request<EmptyRequest, EmptyResponse>({endpoint: "empty", data: {}, hasSideEffects: false, hasParameters: false});
    }
    public async setup(username: string, password: string): Promise<SetupResponse> 
    {
        password = sha512(password);
        const request = {username : username, password : password};
        return await this.request<SetupRequest, SetupResponse>({endpoint: "setup", data: request, hasSideEffects: true, hasParameters: true});
    }
    public async ban(bannedUsername: string, loggedInPassword : string): Promise<BanResponse> 
    {
        loggedInPassword = sha512(loggedInPassword);
        const request = this.adminRequest();
        request["bannedUsername"] = bannedUsername;
        request["password"] = loggedInPassword;

        return await this.request<BanRequest, BanResponse>({endpoint: "ban",data: request, hasSideEffects: true, hasParameters: true});
    }
    public async rename(oldUsername: string, newUsername: string): Promise<RenameResponse> 
    {
        const request = this.adminRequest();
        request["oldUsername"] = oldUsername;
        request["newUsername"] = newUsername;

        return await this.request<RenameRequest, RenameResponse>({endpoint: "rename",data:  request, hasSideEffects: true, hasParameters: true});
    }
    public async resize(targetUsername: string, newSize: number): Promise<ResizeResponse> 
    {
        const request = this.adminRequest();
        request["targetUsername"] = targetUsername;
        request["newSize"] = newSize;

        return await this.request<ResizeRequest, ResizeResponse>({endpoint: "resize", data: request, hasSideEffects: true, hasParameters: true});
    }
    public async users(): Promise<UsersResponse> 
    {
        const request = this.adminRequest();
        return await this.request<UsersRequest, UsersResponse>({endpoint: "users", data: request, hasSideEffects: false, hasParameters: false});
    }
    
    public async browse(limit: number, offset: number): Promise<BrowseResponse> 
    {
        return await this.request<BrowseRequest, BrowseResponse>({endpoint: "browse", data: {app: this.jormunOptions.app, limit: limit, offset: offset}, hasSideEffects: false, hasParameters: true});
    }
    public async publish(keys: {[key : string] : Publicity}): Promise<PublishResponse> 
    {
        const request = this.baseRequest();
        request["keys"] = keys;

        return await this.request<PublishRequest, PublishResponse>({endpoint: "publish",data:  request, hasSideEffects: true, hasParameters: true});
    }
    public async peek(keys: Key[]): Promise<PeekResponse> 
    {
        const array : string[] = [];
        for(const i in keys)
        {
            array.push(keys[i].stringifyRemote(0));
        }
        return await this.request<GetRequest, GetResponse>({endpoint: "peek", data: {app: this.jormunOptions.app, keys : array}, hasSideEffects: false, hasParameters: true});
    }
    public async login() : Promise<LoginResponse>
    {
        const request = this.passwordRequest();
        return await this.request<LoginRequest, LoginResponse>({endpoint: "login", data: request, hasSideEffects: true, hasParameters: true});
    }
    public async logout() : Promise<LogoutResponse>
    {
        const request = this.baseRequest();
        return await this.request<LogoutRequest, LogoutResponse>({endpoint: "logout",  data: request, hasSideEffects: true, hasParameters: false});
    }
}