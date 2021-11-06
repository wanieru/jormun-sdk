import * as zod from "zod";
import { Key } from "../Key";
export const invitationRequest = zod.object(
{
    app : zod.string().min(1),
    guestToken : zod.string().min(1),
});
export type InvitationRequest = zod.infer<typeof invitationRequest>;
export interface InvitationResponse
{
    keys : string[]
}