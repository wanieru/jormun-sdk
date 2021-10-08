import * as zod from "zod";
export declare const unshareRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
    keys: zod.ZodArray<zod.ZodString, "many">;
    users: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    keys?: string[];
    password?: string;
    username?: string;
    app?: string;
    users?: string[];
}, {
    keys?: string[];
    password?: string;
    username?: string;
    app?: string;
    users?: string[];
}>;
export declare type UnshareRequest = zod.infer<typeof unshareRequest>;
export interface UnshareResponse {
}
