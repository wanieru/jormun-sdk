import * as zod from "zod";
export declare const registerRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    newUsername: zod.ZodString;
    newPassword: zod.ZodString;
    size: zod.ZodNumber;
    isAdmin: zod.ZodBoolean;
}, "strip", zod.ZodTypeAny, {
    size?: number;
    username?: string;
    token?: string;
    newPassword?: string;
    newUsername?: string;
    isAdmin?: boolean;
}, {
    size?: number;
    username?: string;
    token?: string;
    newPassword?: string;
    newUsername?: string;
    isAdmin?: boolean;
}>;
export declare type RegisterRequest = zod.infer<typeof registerRequest>;
export interface RegisterResponse {
}
