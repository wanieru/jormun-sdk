import * as zod from "zod";
export declare const setRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
    data: zod.ZodObject<{}, "strip", zod.ZodTypeAny, {}, {}>;
}, "strip", zod.ZodTypeAny, {
    data?: {};
    password?: string;
    username?: string;
    app?: string;
}, {
    data?: {};
    password?: string;
    username?: string;
    app?: string;
}>;
export declare type SetRequest = zod.infer<typeof setRequest>;
export interface SetResponse {
    [key: string]: number;
}
