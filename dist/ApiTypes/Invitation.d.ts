import * as zod from "zod";
export declare const invitationRequest: zod.ZodObject<{
    app: zod.ZodString;
    guestToken: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    app: string;
    guestToken: string;
}, {
    app: string;
    guestToken: string;
}>;
export declare type InvitationRequest = zod.infer<typeof invitationRequest>;
export interface InvitationResponse {
    keys: string[];
}
