import * as zod from "zod";
export const unshareRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1),
    keys : zod.array(zod.string().min(1)).min(1),
    users : zod.array(zod.string().min(1)).min(1)
});
export type UnshareRequest = zod.infer<typeof unshareRequest>;
export interface UnshareResponse
{
}