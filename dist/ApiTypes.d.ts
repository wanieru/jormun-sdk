import * as zod from "zod";
export declare const statusRequest: zod.ZodObject<{
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
export declare type StatusReuqest = zod.infer<typeof statusRequest>;
export interface StatusResponse {
    userId: number;
    isAdmin: boolean;
    storage: number;
    used: number;
}
export interface KeyResponse {
    [key: string]: number;
}
export interface DataResponse {
    [key: string]: any;
}
