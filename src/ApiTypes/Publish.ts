import * as zod from "zod";
export const publishRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1),
    keys : zod.record(zod.string(), zod.enum(["public", "unlisted", "private"]))
});
export type PublishRequest = zod.infer<typeof publishRequest>;
export interface PublishResponse
{
}
export type Publicity = "public" | "unlisted" | "private";