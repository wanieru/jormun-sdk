import * as zod from "zod";
export const revokeRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1),
    guestTokens : zod.array(zod.string().min(1)),
});
export type RevokeRequest = zod.infer<typeof revokeRequest>;
export interface RevokeResponse
{
}