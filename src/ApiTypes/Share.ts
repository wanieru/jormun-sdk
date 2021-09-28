import * as zod from "zod";
export const shareRequest = zod.object(
{
});
export type ShareRequest = zod.infer<typeof shareRequest>;
export interface ShareResponse
{
}