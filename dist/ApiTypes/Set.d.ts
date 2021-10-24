import * as zod from "zod";
export declare const setRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    data: zod.ZodRecord<zod.ZodString, zod.ZodUnion<[zod.ZodUnion<[zod.ZodString, zod.ZodNumber]>, zod.ZodBoolean]>>;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    token?: string;
    app?: string;
    data?: Record<string, string | number | boolean>;
}, {
    username?: string;
    token?: string;
    app?: string;
    data?: Record<string, string | number | boolean>;
}>;
export declare type SetRequest = zod.infer<typeof setRequest>;
export interface SetResponse {
    [key: string]: number;
}
