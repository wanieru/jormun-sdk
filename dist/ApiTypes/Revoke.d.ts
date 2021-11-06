import * as zod from "zod";
export declare const revokeRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    guestTokens: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    token?: string;
    app?: string;
    guestTokens?: string[];
}, {
    username?: string;
    token?: string;
    app?: string;
    guestTokens?: string[];
}>;
export declare type RevokeRequest = zod.infer<typeof revokeRequest>;
export interface RevokeResponse {
}
