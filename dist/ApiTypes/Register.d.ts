import * as zod from "zod";
export declare const registerRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    password: zod.ZodString;
    newUsername: zod.ZodString;
    newPassword: zod.ZodString;
    size: zod.ZodNumber;
    isAdmin: zod.ZodBoolean;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    token?: string;
    password?: string;
    newPassword?: string;
    newUsername?: string;
    size?: number;
    isAdmin?: boolean;
}, {
    username?: string;
    token?: string;
    password?: string;
    newPassword?: string;
    newUsername?: string;
    size?: number;
    isAdmin?: boolean;
}>;
export declare type RegisterRequest = zod.infer<typeof registerRequest>;
export interface RegisterResponse {
}
