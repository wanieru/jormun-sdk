import * as zod from "zod";

export const keysRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    app : zod.string().min(1)
});
export type KeysRequest = zod.infer<typeof keysRequest>;
export interface KeysResponse
{
    [key : string] : {timestamp: number, public : boolean}
}