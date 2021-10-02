import * as zod from "zod";
export declare const usersRequest: zod.ZodObject<{
    username: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    username?: string;
    password?: string;
}, {
    username?: string;
    password?: string;
}>;
export declare type UsersRequest = zod.infer<typeof usersRequest>;
export interface UsersResponse {
    [id: number]: {
        username: string;
        isAdmin: boolean;
        size: number;
        used: number;
    };
}
