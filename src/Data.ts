import { ILocal } from "./ILocal";
import { Jormun } from "./Jormun";

export class Data
{
    private json : string;
    private prefix : string;
    private fragment : string;
    private key : string;

    public constructor(prefix : string, fragment : string)
    {
        this.prefix = prefix;
        this.fragment = fragment;
        this.key = `${this.prefix}${this.fragment}`;
    }
    public async sync()
    {
        await Jormun.sync([this]);
    }
    public get = () => JSON.parse(this.json);
    public set(value)
    {
        this.json = JSON.stringify(value);
        Jormun.local.setValue(this.key, this.json);
    }
    public async setAndSync(value)
    {
        this.set(value);
        await this.sync();
    }
}