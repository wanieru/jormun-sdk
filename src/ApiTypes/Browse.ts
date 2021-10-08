import * as zod from "zod";
export const browseRequest = zod.object(
{
    limit : zod.number().min(1).max(200),
    offset: zod.number().min(0)
});
export type BrowseRequest = zod.infer<typeof browseRequest>;
export interface BrowseResponse
{
    [key : string] : number
}