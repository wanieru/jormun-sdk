import * as zod from "zod";
import { Key } from "../Key";
export declare const inquireRequest: zod.ZodObject<{
    app: zod.ZodString;
    guestToken: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    app?: string;
    guestToken?: string;
}, {
    app?: string;
    guestToken?: string;
}>;
export declare type InquireRequest = zod.infer<typeof inquireRequest>;
export interface InquireResponse {
    key: Key[];
}
