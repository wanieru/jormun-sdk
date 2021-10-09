import * as zod from "zod";
export declare const getRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    keys: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    keys?: string[];
    username?: string;
    token?: string;
    app?: string;
}, {
    keys?: string[];
    username?: string;
    token?: string;
    app?: string;
}>;
export declare type GetRequest = zod.infer<typeof getRequest>;
export interface GetResponse {
    [key: string]: any;
}
