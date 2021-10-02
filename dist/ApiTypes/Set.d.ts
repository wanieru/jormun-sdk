import * as zod from "zod";
export declare const setRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
    data: zod.ZodRecord<zod.ZodString, zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    data?: Record<string, string>;
    username?: string;
    password?: string;
    app?: string;
}, {
    data?: Record<string, string>;
    username?: string;
    password?: string;
    app?: string;
}>;
export declare type SetRequest = zod.infer<typeof setRequest>;
export interface SetResponse {
    [key: string]: number;
}
