import * as zod from "zod";
export declare const resizeRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    targetUsername: zod.ZodString;
    newSize: zod.ZodNumber;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    password?: string;
    targetUsername?: string;
    newSize?: number;
}, {
    username?: string;
    password?: string;
    targetUsername?: string;
    newSize?: number;
}>;
export declare type ResizeRequest = zod.infer<typeof resizeRequest>;
export interface ResizeResponse {
}
