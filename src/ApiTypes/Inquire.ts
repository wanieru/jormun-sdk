import * as zod from "zod";
import { Key } from "../Key";
export const inquireRequest = zod.object(
{
    app : zod.string().min(1),
    guestToken : zod.string().min(1),
});
export type InquireRequest = zod.infer<typeof inquireRequest>;
export interface InquireResponse
{
    key : Key[]
}