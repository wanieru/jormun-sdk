import * as zod from "zod";
export declare const renameRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
    oldUsername: zod.ZodString;
    newUsername: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    password?: string;
    username?: string;
    newUsername?: string;
    oldUsername?: string;
}, {
    password?: string;
    username?: string;
    newUsername?: string;
    oldUsername?: string;
}>;
export declare type RenameRequest = zod.infer<typeof renameRequest>;
export interface RenameResponse {
}
