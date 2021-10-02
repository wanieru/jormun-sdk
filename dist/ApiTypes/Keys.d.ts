import * as zod from "zod";
export declare const keysRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    password?: string;
    app?: string;
}, {
    username?: string;
    password?: string;
    app?: string;
}>;
export declare type KeysRequest = zod.infer<typeof keysRequest>;
export interface KeysResponse {
    [key: string]: number;
}
