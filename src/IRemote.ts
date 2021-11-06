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
import { Key } from "./Key";

export interface IRemote
{
    cachedStatus() : StatusResponse;
    connected() : Promise<boolean>;
    loggedIn() : Promise<boolean>;

    status() : Promise<StatusResponse>;
    keys() : Promise<KeysResponse>;
    get(keys : Key[]) : Promise<GetResponse>;
    set(data : GetResponse) : Promise<SetResponse>;
    share(keys : Key[], users : string[]) : Promise<ShareResponse>;
    unshare(keys : Key[], users : string[]) : Promise<UnshareResponse>;
    leave(keys : Key[]) : Promise<LeaveResponse>;
    delete(keys : Key[]) : Promise<DeleteResponse>;
    grant(keys : Key[]) : Promise<GrantResponse>;
    revoke(token : string[]) : Promise<RevokeResponse>;

    password(password : string, newPassword : string) : Promise<PasswordResponse>;
    register(loggedInPassword : string, newUsername : string, newPassword : string, size : number, isAdmin : boolean) : Promise<RegisterResponse>;
    empty() : Promise<EmptyResponse>;
    setup(username : string, password : string) : Promise<SetupResponse>;
    ban(bannedUsername : string, loggedInPassword : string) : Promise<BanResponse>;
    rename(oldUsername : string, newUsername : string) : Promise<RenameResponse>;
    resize(targetUsername : string, newSize : number) : Promise<ResizeResponse>;
    users() : Promise<UsersResponse>;
    login() : Promise<LoginResponse>;
    logout() : Promise<LogoutResponse>;

    browse(limit : number, offset : number) : Promise<BrowseResponse>;
    publish(keys: {[key : string] : Publicity}) : Promise<PublishResponse>;
    peek(keys : Key[]) : Promise<PeekResponse>;
    inquire(guestToken : string) : Promise<InquireResponse>;
    getAsGuest(keys : Key[], guestToken : string) : Promise<GetResponse>;
    setAsGuest(data : GetResponse, guestToken : string) : Promise<SetResponse>;
}
/** Interface for interacting with a Jormun Remote from regular apps. Exposes methods like share and publish, which aren't available through the Jormun class. */
export interface IPublicRemote
{
    /** Returns a cache of the status endpoint. */
    cachedStatus() : StatusResponse;
    /** True if we have gotten a valid response from the remote. */
    connected() : Promise<boolean>;
    /** True if we have gotten a valid response from an endpoint that requires a login. */
    loggedIn() : Promise<boolean>;

    /** Gets status about the logged in user. */
    status() : Promise<StatusResponse>;

    /** Share the specified keys with the specified usernames */
    share(keys : Key[], users : string[]) : Promise<ShareResponse>;
    /** Unshare the specified keys with the specified usernames. */
    unshare(keys : Key[], users : string[]) : Promise<UnshareResponse>;
    /** Stop the specified keys from being shared with us. */
    leave(keys : Key[]) : Promise<LeaveResponse>;
    /** Create a guest token that can be used to get and set the specified keys. */
    grant(keys : Key[]) : Promise<GrantResponse>;
    /** Revoke the specified guest tokens. */
    revoke(token : string[]) : Promise<RevokeResponse>;

    /** List public keys. */
    browse(limit : number, offset : number) : Promise<BrowseResponse>;
    /** Set the publicity for the specified keys. The dictionary maps remote-stringified-keys to their new publicity. */
    publish(keys : {[key : string] : Publicity}) : Promise<PublishResponse>;
    /** Get the values of the specified unlisted or public keys. */
    peek(keys : Key[]) : Promise<PeekResponse>;
    /** Gets a list of keys the specified guest token can be used on.  */
    inquire(guestToken : string) : Promise<InquireResponse>;
    /** Get info about keys using a guest token. */
    getAsGuest(keys : Key[], guestToken : string) : Promise<GetResponse>;
    /** Set keys using a guest token. */
    setAsGuest(data : GetResponse, guestToken : string) : Promise<SetResponse>;
}
/** Interface for interacting with a Jormun Remote anonymously. */
export interface IAnonymousRemote
{
    /** True if we have gotten a valid response from the remote. */
    connected() : Promise<boolean>;

    /** List public keys. */
    browse(limit : number, offset : number) : Promise<BrowseResponse>;
    /** Get the values of the specified unlisted or public keys. */
    peek(keys : Key[]) : Promise<PeekResponse>;
    /** Gets a list of keys the specified guest token can be used on.  */
    inquire(guestToken : string) : Promise<InquireResponse>;
    /** Get info about keys using a guest token. */
    getAsGuest(keys : Key[], guestToken : string) : Promise<GetResponse>;
    /** Set keys using a guest token. */
    setAsGuest(data : GetResponse, guestToken : string) : Promise<SetResponse>;
}