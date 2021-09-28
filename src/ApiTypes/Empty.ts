import * as zod from "zod";
export const emptyRequest = zod.object(
{
});
export type EmptyRequest = zod.infer<typeof emptyRequest>;
export interface EmptyResponse
{
}