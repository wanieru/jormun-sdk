import * as zod from "zod";
export const renameRequest = zod.object(
{
    username : zod.string().min(1),
    password : zod.string().min(1),
    oldUsername : zod.string().min(1),
    newUsername : zod.string().min(1),
});
export type RenameRequest = zod.infer<typeof renameRequest>;
export interface RenameResponse
{
}