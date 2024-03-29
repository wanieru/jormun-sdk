import * as zod from "zod";
export declare const renameRequest: zod.ZodObject<{
    username: zod.ZodString;
    token: zod.ZodString;
    oldUsername: zod.ZodString;
    newUsername: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username: string;
    token: string;
    newUsername: string;
    oldUsername: string;
}, {
    username: string;
    token: string;
    newUsername: string;
    oldUsername: string;
}>;
export declare type RenameRequest = zod.infer<typeof renameRequest>;
export interface RenameResponse {
}
