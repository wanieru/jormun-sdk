import * as zod from "zod";
export const setupRequest = zod.object(
{
});
export type SetupRequest = zod.infer<typeof setupRequest>;
export interface SetupResponse
{
}