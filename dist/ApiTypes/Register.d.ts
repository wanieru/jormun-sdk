import * as zod from "zod";
export declare const registerRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    newUsername: zod.ZodString;
    newPassword: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    password?: string;
    username?: string;
    newPassword?: string;
    newUsername?: string;
}, {
    password?: string;
    username?: string;
    newPassword?: string;
    newUsername?: string;
}>;
export declare type RegisterRequest = zod.infer<typeof registerRequest>;
export interface RegisterResponse {
}
