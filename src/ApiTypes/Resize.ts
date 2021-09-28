import * as zod from "zod";
export const resizeRequest = zod.object(
{
});
export type ResizeRequest = zod.infer<typeof resizeRequest>;
export interface ResizeResponse
{
}