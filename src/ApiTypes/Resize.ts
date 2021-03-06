import * as zod from "zod";
export const resizeRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    targetUsername : zod.string().min(1),
    newSize : zod.number().min(1),
});
export type ResizeRequest = zod.infer<typeof resizeRequest>;
export interface ResizeResponse
{
}