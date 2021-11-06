import * as zod from "zod";
export const uninviteRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1),
    tokenIds : zod.array(zod.string().min(1)),
});
export type UninviteRequest = zod.infer<typeof uninviteRequest>;
export interface UninviteResponse
{
}