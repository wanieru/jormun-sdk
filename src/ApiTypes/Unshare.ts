import * as zod from "zod";
export const unshareRequest = zod.object(
{
});
export type UnshareRequest = zod.infer<typeof unshareRequest>;
export interface UnshareResponse
{
}