import * as zod from "zod";
export declare const banRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    bannedUsername: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    token?: string;
    bannedUsername?: string;
}, {
    username?: string;
    token?: string;
    bannedUsername?: string;
}>;
export declare type BanRequest = zod.infer<typeof banRequest>;
export interface BanResponse {
}
