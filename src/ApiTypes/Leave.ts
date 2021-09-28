import * as zod from "zod";
export const leaveRequest = zod.object(
{
});
export type LeaveRequest = zod.infer<typeof leaveRequest>;
export interface LeaveResponse
{
}