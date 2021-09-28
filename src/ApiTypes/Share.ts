import * as zod from "zod";
export const shareRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    app : zod.string().min(1),
    keys : zod.array(zod.string().min(1)).min(1),
    users : zod.array(zod.string().min(1)).min(1)
});
export type ShareRequest = zod.infer<typeof shareRequest>;
export interface ShareResponse
{
}