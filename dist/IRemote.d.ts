import { BanResponse } from "./ApiTypes/Ban";
import { BrowseResponse } from "./ApiTypes/Browse";
import { DeleteResponse } from "./ApiTypes/Delete";
import { EmptyResponse } from "./ApiTypes/Empty";
import { GetResponse } from "./ApiTypes/Get";
import { InviteResponse } from "./ApiTypes/Invite";
import { InvitationResponse } from "./ApiTypes/Invitation";
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
import { UninviteResponse } from "./ApiTypes/Uninvite";
import { SetResponse } from "./ApiTypes/Set";
import { SetupResponse } from "./ApiTypes/Setup";
import { ShareResponse } from "./ApiTypes/Share";
import { StatusResponse } from "./ApiTypes/Status";
import { UnshareResponse } from "./ApiTypes/Unshare";
import { UsersResponse } from "./ApiTypes/Users";
import { Key } from "./Key";
export interface IRemote {
    cachedStatus(): StatusResponse | null;
    connected(): Promise<boolean>;
    loggedIn(): Promise<boolean>;
    status(): Promise<StatusResponse | null>;
    keys(): Promise<KeysResponse | null>;
    get(keys: Key[]): Promise<GetResponse | null>;
    set(data: GetResponse): Promise<SetResponse | null>;
    share(keys: Key[], users: string[]): Promise<ShareResponse | null>;
    unshare(keys: Key[], users: string[]): Promise<UnshareResponse | null>;
    leave(keys: Key[]): Promise<LeaveResponse | null>;
    delete(keys: Key[]): Promise<DeleteResponse | null>;
    invite(keys: Key[]): Promise<InviteResponse | null>;
    uninvite(tokenId: string[]): Promise<UninviteResponse | null>;
    password(password: string, newPassword: string): Promise<PasswordResponse | null>;
    register(loggedInPassword: string, newUsername: string, newPassword: string, size: number, isAdmin: boolean): Promise<RegisterResponse | null>;
    empty(): Promise<EmptyResponse | null>;
    setup(username: string, password: string): Promise<SetupResponse | null>;
    ban(bannedUsername: string, loggedInPassword: string): Promise<BanResponse | null>;
    rename(oldUsername: string, newUsername: string): Promise<RenameResponse | null>;
    resize(targetUsername: string, newSize: number): Promise<ResizeResponse | null>;
    users(): Promise<UsersResponse | null>;
    login(): Promise<LoginResponse | null>;
    logout(): Promise<LogoutResponse | null>;
    browse(limit: number, offset: number): Promise<BrowseResponse | null>;
    publish(keys: {
        key: Key;
        publicity: Publicity;
    }[]): Promise<PublishResponse | null>;
    peek(keys: Key[]): Promise<PeekResponse | null>;
    invitation(guestToken: string): Promise<InvitationResponse | null>;
    getAsGuest(keys: Key[], guestToken: string): Promise<GetResponse | null>;
    setAsGuest(data: GetResponse, guestToken: string): Promise<SetResponse | null>;
}
/** Interface for interacting with a Jormun Remote from regular apps. Exposes methods like share and publish, which aren't available through the Jormun class. */
export interface IPublicRemote {
    /** Returns a cache of the status endpoint. */
    cachedStatus(): StatusResponse | null;
    /** True if we have gotten a valid response from the remote. */
    connected(): Promise<boolean>;
    /** True if we have gotten a valid response from an endpoint that requires a login. */
    loggedIn(): Promise<boolean>;
    /** Gets status about the logged in user. */
    status(): Promise<StatusResponse | null>;
    /** Share the specified keys with the specified usernames */
    share(keys: Key[], users: string[]): Promise<ShareResponse | null>;
    /** Unshare the specified keys with the specified usernames. */
    unshare(keys: Key[], users: string[]): Promise<UnshareResponse | null>;
    /** Stop the specified keys from being shared with us. */
    leave(keys: Key[]): Promise<LeaveResponse | null>;
    /** Create a guest token that can be used to get and set the specified keys. */
    invite(keys: Key[]): Promise<InviteResponse | null>;
    /** Revoke the specified guest tokens. */
    uninvite(tokenIds: string[]): Promise<UninviteResponse | null>;
    /** List public keys. */
    browse(limit: number, offset: number): Promise<BrowseResponse | null>;
    /** Set the publicity for the specified keys. */
    publish(keys: {
        key: Key;
        publicity: Publicity;
    }[]): Promise<PublishResponse | null>;
    /** Get the values of the specified unlisted or public keys. */
    peek(keys: Key[]): Promise<PeekResponse | null>;
    /** Gets a list of keys the specified guest token can be used on.  */
    invitation(guestToken: string): Promise<InvitationResponse | null>;
    /** Get info about keys using a guest token. */
    getAsGuest(keys: Key[], guestToken: string): Promise<GetResponse | null>;
    /** Set keys using a guest token. */
    setAsGuest(data: GetResponse, guestToken: string): Promise<SetResponse | null>;
}
/** Interface for interacting with a Jormun Remote anonymously. */
export interface IAnonymousRemote {
    /** True if we have gotten a valid response from the remote. */
    connected(): Promise<boolean>;
    /** List public keys. */
    browse(limit: number, offset: number): Promise<BrowseResponse | null>;
    /** Get the values of the specified unlisted or public keys. */
    peek(keys: Key[]): Promise<PeekResponse | null>;
    /** Gets a list of keys the specified guest token can be used on.  */
    invitation(guestToken: string): Promise<InvitationResponse | null>;
    /** Get info about keys using a guest token. */
    getAsGuest(keys: Key[], guestToken: string): Promise<GetResponse | null>;
    /** Set keys using a guest token. */
    setAsGuest(data: GetResponse, guestToken: string): Promise<SetResponse | null>;
}
