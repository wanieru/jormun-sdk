import * as zod from "zod";
export declare const setupRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    password?: string;
}, {
    username?: string;
    password?: string;
}>;
export declare type SetupRequest = zod.infer<typeof setupRequest>;
export interface SetupResponse {
}
