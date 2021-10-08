import { BanResponse } from "./ApiTypes/Ban";
import { BrowseResponse } from "./ApiTypes/Browse";
import { DeleteResponse } from "./ApiTypes/Delete";
import { EmptyResponse } from "./ApiTypes/Empty";
import { GetResponse } from "./ApiTypes/Get";
import { KeysResponse } from "./ApiTypes/Keys";
import { LeaveResponse } from "./ApiTypes/Leave";
import { PasswordResponse } from "./ApiTypes/Password";
import { PeekResponse } from "./ApiTypes/Peek";
import { PublishResponse } from "./ApiTypes/Publish";
import { RegisterResponse } from "./ApiTypes/Register";
import { RenameResponse } from "./ApiTypes/Rename";
import { ResizeResponse } from "./ApiTypes/Resize";
import { SetResponse } from "./ApiTypes/Set";
import { SetupResponse } from "./ApiTypes/Setup";
import { ShareResponse } from "./ApiTypes/Share";
import { StatusResponse } from "./ApiTypes/Status";
import { UnpublishResponse } from "./ApiTypes/Unpublish";
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

    password(newPassword : string) : Promise<PasswordResponse>;
    register(newUsername : string, newPassword : string, size : number, isAdmin : boolean) : Promise<RegisterResponse>;
    empty() : Promise<EmptyResponse>;
    setup(username : string, password : string) : Promise<SetupResponse>;
    ban(bannedUsername : string) : Promise<BanResponse>;
    rename(oldUsername : string, newUsername : string) : Promise<RenameResponse>;
    resize(targetUsername : string, newSize : number) : Promise<ResizeResponse>;
    users() : Promise<UsersResponse>;

    browse(limit : number, offset : number) : Promise<BrowseResponse>;
    publish(keys : Key[]) : Promise<PublishResponse>;
    unpublish(keys : Key[]) : Promise<UnpublishResponse>;
    peek(keys : Key[]) : Promise<PeekResponse>;
}