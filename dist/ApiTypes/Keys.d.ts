import * as zod from "zod";
export declare const keysRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    app: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    password?: string;
    username?: string;
    app?: string;
}, {
    password?: string;
    username?: string;
    app?: string;
}>;
export declare type KeysRequest = zod.infer<typeof keysRequest>;
export interface KeysResponse {
    [key: string]: {
        timestamp: number;
        public: boolean;
    };
}
