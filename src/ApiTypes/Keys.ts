import * as zod from "zod";
import { Publicity } from "./Publish";

export const keysRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1)
});
export type KeysRequest = zod.infer<typeof keysRequest>;
export interface KeysResponse
{
    [key : string] : {timestamp: number, public : Publicity, sharedWith : number[]}
}