import * as zod from "zod";
export declare const setRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    data: zod.ZodRecord<zod.ZodString, zod.ZodAny>;
}, "strip", zod.ZodTypeAny, {
    data: Record<string, any>;
    username: string;
    token: string;
    app: string;
}, {
    data: Record<string, any>;
    username: string;
    token: string;
    app: string;
}>;
export declare type SetRequest = zod.infer<typeof setRequest>;
export interface SetResponse {
    [key: string]: number;
}
