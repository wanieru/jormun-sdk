import * as zod from "zod";
export const setRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1),
    data : zod.record(zod.string().or(zod.number()).or(zod.boolean()))
});
export type SetRequest = zod.infer<typeof setRequest>;
export interface SetResponse
{
    [key : string] : number
}