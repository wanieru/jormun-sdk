import * as zod from "zod";
export declare const peekRequest: zod.ZodObject<{
    keys: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    keys?: string[];
}, {
    keys?: string[];
}>;
export declare type PeekRequest = zod.infer<typeof peekRequest>;
export interface PeekResponse {
}
