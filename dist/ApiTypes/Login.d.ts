import * as zod from "zod";
export declare const loginRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    password: string;
    app: string;
}, {
    username: string;
    password: string;
    app: string;
}>;
export declare type LoginRequest = zod.infer<typeof loginRequest>;
export interface LoginResponse {
    token: string;
}
