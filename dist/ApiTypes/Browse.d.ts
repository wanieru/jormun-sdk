import * as zod from "zod";
export declare const browseRequest: zod.ZodObject<{
    app: zod.ZodString;
    limit: zod.ZodNumber;
    offset: zod.ZodNumber;
}, "strip", zod.ZodTypeAny, {
    offset: number;
    app: string;
    limit: number;
}, {
    offset: number;
    app: string;
    limit: number;
}>;
export declare type BrowseRequest = zod.infer<typeof browseRequest>;
export interface BrowseResponse {
    keys: {
        [key: string]: number;
    };
    usernames: {
        [id: number]: string;
    };
}
