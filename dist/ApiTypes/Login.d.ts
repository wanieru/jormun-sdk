import * as zod from "zod";
export declare const loginRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    password?: string;
    username?: string;
    app?: string;
}, {
    password?: string;
    username?: string;
    app?: string;
}>;
export declare type LoginRequest = zod.infer<typeof loginRequest>;
export interface LoginResponse {
    token: string;
}
