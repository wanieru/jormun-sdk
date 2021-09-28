import * as zod from "zod";
export const resizeRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    targetUsername : zod.string().min(1),
    newSize : zod.number(),
});
export type ResizeRequest = zod.infer<typeof resizeRequest>;
export interface ResizeResponse
{
}