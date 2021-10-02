import * as zod from "zod";
export declare const statusRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    password?: string;
}, {
    username?: string;
    password?: string;
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
