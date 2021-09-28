import * as zod from "zod";
export declare const resizeRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    targetUsername: zod.ZodString;
    newSize: zod.ZodNumber;
}, "strip", zod.ZodTypeAny, {
    password?: string;
    username?: string;
    targetUsername?: string;
    newSize?: number;
}, {
    password?: string;
    username?: string;
    targetUsername?: string;
    newSize?: number;
}>;
export declare type ResizeRequest = zod.infer<typeof resizeRequest>;
export interface ResizeResponse {
}
