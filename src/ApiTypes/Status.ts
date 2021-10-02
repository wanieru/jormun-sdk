import * as zod from "zod";
export const statusRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1)
});
export type StatusRequest = zod.infer<typeof statusRequest>;
export interface StatusResponse
{
    userId : number,
    isAdmin : boolean,
    storage : number,
    used : number,
    friends : {[id : number] : string }
}