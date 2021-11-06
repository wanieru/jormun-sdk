import { BanResponse } from "./ApiTypes/Ban";
import { BrowseResponse } from "./ApiTypes/Browse";
import { DeleteResponse } from "./ApiTypes/Delete";
import { EmptyResponse } from "./ApiTypes/Empty";
import { GetResponse } from "./ApiTypes/Get";
import { GrantResponse } from "./ApiTypes/Grant";
import { InquireResponse } from "./ApiTypes/Inquire";
import { KeysResponse } from "./ApiTypes/Keys";
import { LeaveResponse } from "./ApiTypes/Leave";
import { LoginResponse } from "./ApiTypes/Login";
import { LogoutResponse } from "./ApiTypes/Logout";
import { PasswordResponse } from "./ApiTypes/Password";
import { PeekResponse } from "./ApiTypes/Peek";
import { Publicity, PublishResponse } from "./ApiTypes/Publish";
import { RegisterResponse } from "./ApiTypes/Register";
import { RenameResponse } from "./ApiTypes/Rename";
import { ResizeResponse } from "./ApiTypes/Resize";
import { RevokeResponse } from "./ApiTypes/Revoke";
import { SetResponse } from "./ApiTypes/Set";
import { SetupResponse } from "./ApiTypes/Setup";
import { ShareResponse } from "./ApiTypes/Share";
import { StatusResponse } from "./ApiTypes/Status";
import { UnshareResponse } from "./ApiTypes/Unshare";
import { UsersResponse } from "./ApiTypes/Users";
import { IRemote } from "./IRemote";
import { Jormun, JormunOptions } from "./Jormun";
import { Key } from "./Key";
export declare class JormunSyncRemote implements IRemote {
    private jormun;
    jormunOptions: JormunOptions;
    private statusCache;
    private isLoggedIn;
    private isConnected;
    private checkedConnection;
    private checkingConnection;
    private cache;
    private cacheTime;
    constructor(jormun: Jormun, jormunOptions: JormunOptions);
    checkConnection(): Promise<void>;
    private statusToString;
    private request;
    private baseRequest;
    private adminRequest;
    private passwordRequest;
    cachedStatus(): StatusResponse;
    loggedIn(): Promise<boolean>;
    connected(): Promise<boolean>;
    status(): Promise<StatusResponse>;
    keys(): Promise<KeysResponse>;
    get(keys: Key[]): Promise<GetResponse>;
    set(data: GetResponse): Promise<SetResponse>;
    delete(keys: Key[]): Promise<DeleteResponse>;
    share(keys: Key[], users: string[]): Promise<ShareResponse>;
    unshare(keys: Key[], users: string[]): Promise<UnshareResponse>;
    leave(keys: Key[]): Promise<LeaveResponse>;
    password(password: string, newPassword: string): Promise<PasswordResponse>;
    register(loggedInPassword: string, newUsername: string, newPassword: string, size: number, isAdmin: boolean): Promise<RegisterResponse>;
    empty(): Promise<EmptyResponse>;
    setup(username: string, password: string): Promise<SetupResponse>;
    ban(bannedUsername: string, loggedInPassword: string): Promise<BanResponse>;
    rename(oldUsername: string, newUsername: string): Promise<RenameResponse>;
    resize(targetUsername: string, newSize: number): Promise<ResizeResponse>;
    users(): Promise<UsersResponse>;
    browse(limit: number, offset: number): Promise<BrowseResponse>;
    publish(keys: {
        [key: string]: Publicity;
    }): Promise<PublishResponse>;
    peek(keys: Key[]): Promise<PeekResponse>;
    login(): Promise<LoginResponse>;
    logout(): Promise<LogoutResponse>;
    grant(keys: Key[]): Promise<GrantResponse>;
    revoke(tokens: string[]): Promise<RevokeResponse>;
    inquire(guestToken: string): Promise<InquireResponse>;
    getAsGuest(keys: Key[], guestToken: string): Promise<GetResponse>;
    setAsGuest(data: GetResponse, guestToken: string): Promise<SetResponse>;
}
