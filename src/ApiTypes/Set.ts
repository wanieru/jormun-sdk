import * as zod from "zod";
export const setRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    app : zod.string().min(1),
    data : zod.object({})
});
export type SetRequest = zod.infer<typeof setRequest>;
export interface SetResponse
{
    [key : string] : number
}