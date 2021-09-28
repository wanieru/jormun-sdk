import * as zod from "zod";
export declare const passwordRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    newPassword: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    password?: string;
    username?: string;
    newPassword?: string;
}, {
    password?: string;
    username?: string;
    newPassword?: string;
}>;
export declare type PasswordRequest = zod.infer<typeof passwordRequest>;
export interface PasswordResponse {
}