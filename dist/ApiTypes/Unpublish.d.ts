import * as zod from "zod";
export declare const unpublishRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
    keys: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    keys?: string[];
    password?: string;
    username?: string;
    app?: string;
}, {
    keys?: string[];
    password?: string;
    username?: string;
    app?: string;
}>;
export declare type UnpublishRequest = zod.infer<typeof unpublishRequest>;
export interface UnpublishResponse {
}
