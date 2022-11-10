import * as zod from "zod";
export declare const uninviteRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    tokenIds: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    username: string;
    token: string;
    app: string;
    tokenIds: string[];
}, {
    username: string;
    token: string;
    app: string;
    tokenIds: string[];
}>;
export declare type UninviteRequest = zod.infer<typeof uninviteRequest>;
export interface UninviteResponse {
}
