import * as zod from "zod";
export declare const resizeRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    targetUsername: zod.ZodString;
    newSize: zod.ZodNumber;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    token?: string;
    targetUsername?: string;
    newSize?: number;
}, {
    username?: string;
    token?: string;
    targetUsername?: string;
    newSize?: number;
}>;
export declare type ResizeRequest = zod.infer<typeof resizeRequest>;
export interface ResizeResponse {
}
