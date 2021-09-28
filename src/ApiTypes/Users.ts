import * as zod from "zod";
export const usersRequest = zod.object(
{
});
export type UsersRequest = zod.infer<typeof usersRequest>;
export interface UsersResponse
{
}