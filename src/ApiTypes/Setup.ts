import * as zod from "zod";
export const setupRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
});
export type SetupRequest = zod.infer<typeof setupRequest>;
export interface SetupResponse
{
}