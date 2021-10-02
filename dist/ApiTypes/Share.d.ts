import * as zod from "zod";
export declare const shareRequest: zod.ZodObject<{
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
export declare type ShareRequest = zod.infer<typeof shareRequest>;
export interface ShareResponse {
}
