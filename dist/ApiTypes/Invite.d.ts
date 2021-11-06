import * as zod from "zod";
export declare const inviteRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    keys: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    token?: string;
    app?: string;
    keys?: string[];
}, {
    username?: string;
    token?: string;
    app?: string;
    keys?: string[];
}>;
export declare type InviteRequest = zod.infer<typeof inviteRequest>;
export interface InviteResponse {
    guestTokenId: string;
    guestToken: string;
}
