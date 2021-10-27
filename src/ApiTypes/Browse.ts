import * as zod from "zod";
export const browseRequest = zod.object(
{
    app : zod.string().min(1),
    limit : zod.number().min(1).max(200),
    offset: zod.number().min(0)
});
export type BrowseRequest = zod.infer<typeof browseRequest>;
export interface BrowseResponse
{
    keys : {[key : string] : number},
    usernames : {[id : number] : string}
}