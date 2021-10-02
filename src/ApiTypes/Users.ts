import * as zod from "zod";
export const usersRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1)
});
export type UsersRequest = zod.infer<typeof usersRequest>;
export interface UsersResponse
{
    [id : number] : {username : string, isAdmin : boolean, size : number, used : number, id : number}
}