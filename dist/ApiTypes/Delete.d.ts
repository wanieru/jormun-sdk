import * as zod from "zod";
export declare const deleteRequest: zod.ZodObject<{
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
export declare type DeleteRequest = zod.infer<typeof deleteRequest>;
export interface DeleteResponse {
}
