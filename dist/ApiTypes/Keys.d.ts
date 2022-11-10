import * as zod from "zod";
import { Publicity } from "./Publish";
export declare const keysRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    token: string;
    app: string;
}, {
    username: string;
    token: string;
    app: string;
}>;
export declare type KeysRequest = zod.infer<typeof keysRequest>;
export interface KeysResponse {
    [key: string]: {
        timestamp: number;
        public: Publicity;
        sharedWith: number[];
    };
}
