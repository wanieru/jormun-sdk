import * as zod from "zod";
export const leaveRequest = zod.object(
{
    username : zod.string().min(1),
    token : zod.string().min(1),
    app : zod.string().min(1),
    keys : zod.array(zod.string().min(1)).min(1)
});
export type LeaveRequest = zod.infer<typeof leaveRequest>;
export interface LeaveResponse
{
}