import * as zod from "zod";
export declare const logoutRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    token?: string;
    app?: string;
}, {
    username?: string;
    token?: string;
    app?: string;
}>;
export declare type LogoutRequest = zod.infer<typeof logoutRequest>;
export interface LogoutResponse {
}
