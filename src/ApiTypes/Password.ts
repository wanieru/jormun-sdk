import * as zod from "zod";
export const passwordRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    newPassword : zod.string().min(1),
});
export type PasswordRequest = zod.infer<typeof passwordRequest>;
export interface PasswordResponse
{
}