import * as zod from "zod";
export const registerRequest = zod.object(
{
});
export type RegisterRequest = zod.infer<typeof registerRequest>;
export interface RegisterResponse
{
}