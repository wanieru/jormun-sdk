import * as zod from "zod";
export declare const peekRequest: zod.ZodObject<{
    app: zod.ZodString;
    keys: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    keys?: string[];
    app?: string;
}, {
    keys?: string[];
    app?: string;
}>;
export declare type PeekRequest = zod.infer<typeof peekRequest>;
export interface PeekResponse {
    [key: string]: any;
}
