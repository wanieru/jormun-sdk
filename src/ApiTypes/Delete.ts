import * as zod from "zod";
export const deleteRequest = zod.object(
{
});
export type DeleteRequest = zod.infer<typeof deleteRequest>;
export interface DeleteResponse
{
}