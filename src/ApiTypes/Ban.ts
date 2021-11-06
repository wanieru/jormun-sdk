import * as zod from "zod";
export const banRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    password : zod.string().min(1),
    bannedUsername : zod.string().min(1)
});
export type BanRequest = zod.infer<typeof banRequest>;
export interface BanResponse
{
}