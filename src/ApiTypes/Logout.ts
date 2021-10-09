import * as zod from "zod";
export const logoutRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1)
});
export type LogoutRequest = zod.infer<typeof logoutRequest>;
export interface LogoutResponse
{
}