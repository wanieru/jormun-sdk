import * as zod from "zod";
export const banRequest = zod.object(
{
});
export type BanRequest = zod.infer<typeof banRequest>;
export interface BanResponse
{
}