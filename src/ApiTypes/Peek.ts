import * as zod from "zod";
export const peekRequest = zod.object(
{
    keys : zod.array(zod.string().min(1)).min(1)
});
export type PeekRequest = zod.infer<typeof peekRequest>;
export interface PeekResponse
{
    [key : string] : any;
}