import * as zod from "zod";
export declare const unshareRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    keys: zod.ZodArray<zod.ZodString, "many">;
    users: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    keys: string[];
    username: string;
    token: string;
    app: string;
    users: string[];
}, {
    keys: string[];
    username: string;
    token: string;
    app: string;
    users: string[];
}>;
export declare type UnshareRequest = zod.infer<typeof unshareRequest>;
export interface UnshareResponse {
}
