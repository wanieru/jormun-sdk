import * as zod from "zod";
export declare const emptyRequest: zod.ZodObject<{}, "strip", zod.ZodTypeAny, {}, {}>;
export declare type EmptyRequest = zod.infer<typeof emptyRequest>;
export interface EmptyResponse {
    empty: boolean;
}
