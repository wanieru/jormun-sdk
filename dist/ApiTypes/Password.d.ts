import * as zod from "zod";
export declare const passwordRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    password: zod.ZodString;
    newPassword: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    token: string;
    password: string;
    newPassword: string;
}, {
    username: string;
    token: string;
    password: string;
    newPassword: string;
}>;
export declare type PasswordRequest = zod.infer<typeof passwordRequest>;
export interface PasswordResponse {
}
