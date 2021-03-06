import * as zod from "zod";
import { Key } from "../Key";
export const statusRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1)
});
export type StatusRequest = zod.infer<typeof statusRequest>;
export interface StatusResponse
{
    username : string,
    userId : number,
    isAdmin : boolean,
    storage : number,
    used : number,
    friends : {[id : number] : string },
    apps : string[],
    guestTokenIds : {[guestTokenId : string] : string[]}
}