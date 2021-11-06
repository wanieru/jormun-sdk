import * as zod from "zod";
export const grantRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1),
    keys : zod.array(zod.string().min(1)).min(1)
});
export type GrantRequest = zod.infer<typeof grantRequest>;
export interface GrantResponse
{
    guestToken : string
}