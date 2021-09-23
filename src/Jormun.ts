import { Data } from "./Data";

interface JormunUser
{
    [key : string] : Data<{}>
}
export class Jormun
{
    private app : string;
    public constructor(app : string)
    {
        this.app = app;
    }
}