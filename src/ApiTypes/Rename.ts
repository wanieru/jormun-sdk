import * as zod from "zod";
export const renameRequest = zod.object(
{
});
export type RenameRequest = zod.infer<typeof renameRequest>;
export interface RenameResponse
{
}