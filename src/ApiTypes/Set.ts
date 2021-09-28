import * as zod from "zod";
export const setRequest = zod.object(
{
});
export type SetRequest = zod.infer<typeof setRequest>;
export interface SetResponse
{
}