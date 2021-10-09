import * as zod from "zod";
export const loginRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    app : zod.string().min(1)
});
export type LoginRequest = zod.infer<typeof loginRequest>;
export interface LoginResponse
{
    token : string
}