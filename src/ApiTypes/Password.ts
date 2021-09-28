import * as zod from "zod";
export const passwordRequest = zod.object(
{
});
export type PasswordRequest = zod.infer<typeof passwordRequest>;
export interface PasswordResponse
{
}