import * as zod from "zod";
export declare const browseRequest: zod.ZodObject<{
    limit: zod.ZodNumber;
    offset: zod.ZodNumber;
}, "strip", zod.ZodTypeAny, {
    offset?: number;
    limit?: number;
}, {
    offset?: number;
    limit?: number;
}>;
export declare type BrowseRequest = zod.infer<typeof browseRequest>;
export interface BrowseResponse {
    [key: string]: number;
}
