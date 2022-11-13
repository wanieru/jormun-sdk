import * as zod from "zod";
export const registerRequest = zod.object(
    {
        username: zod.string(),
        token: zod.string(),
        password: zod.string(),
        newUsername: zod.string().min(1),
        newPassword: zod.string().min(1),
        size: zod.number().min(1),
        isAdmin: zod.boolean()
    });
export type RegisterRequest = zod.infer<typeof registerRequest>;
export interface RegisterResponse
{
}