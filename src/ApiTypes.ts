import * as zod from "zod";

export const statusRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    app : zod.string().min(1)
});
export type StatusRequest = zod.infer<typeof statusRequest>;
export interface StatusResponse
{
    userId : number,
    isAdmin : boolean,
    storage : number,
    used : number
}


export interface KeyResponse
{
    [key : string] : number
}
export interface DataResponse
{
    [key : string] : any;
}