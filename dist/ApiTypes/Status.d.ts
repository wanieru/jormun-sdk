import * as zod from "zod";
export declare const statusRequest: zod.ZodObject<{
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
export declare type StatusRequest = zod.infer<typeof statusRequest>;
export interface StatusResponse {
    userId: number;
    isAdmin: boolean;
    storage: number;
    used: number;
    friends: {
        [id: number]: string;
    };
}
