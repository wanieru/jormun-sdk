import * as zod from "zod";
export declare const publishRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    app: zod.ZodString;
    keys: zod.ZodRecord<zod.ZodString, zod.ZodEnum<["public", "unlisted", "private"]>>;
}, "strip", zod.ZodTypeAny, {
    keys?: Record<string, "private" | "public" | "unlisted">;
    username?: string;
    token?: string;
    app?: string;
}, {
    keys?: Record<string, "private" | "public" | "unlisted">;
    username?: string;
    token?: string;
    app?: string;
}>;
export declare type PublishRequest = zod.infer<typeof publishRequest>;
export interface PublishResponse {
}
export declare type Publicity = "public" | "unlisted" | "private";
