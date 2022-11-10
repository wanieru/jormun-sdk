import * as zod from "zod";
export declare const setupRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    password: string;
    username: string;
}, {
    password: string;
    username: string;
}>;
export declare type SetupRequest = zod.infer<typeof setupRequest>;
export interface SetupResponse {
}
