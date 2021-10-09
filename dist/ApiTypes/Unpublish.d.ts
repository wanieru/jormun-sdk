import * as zod from "zod";
export declare const unpublishRequest: zod.ZodObject<{
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
export declare type UnpublishRequest = zod.infer<typeof unpublishRequest>;
export interface UnpublishResponse {
}
