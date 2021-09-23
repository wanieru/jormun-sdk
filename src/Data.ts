import { Jormun } from "./Jormun";
import { Pref } from "./Pref";

export class Data
{
    private jormun : Jormun;
    private key : string;
    private object = {};

    public constructor(jormun : Jormun, key : string)
    {
        this.jormun = jormun;
        this.key = key;
        this.object = {};
    }
    public get<T extends object>() : T
    {
        return <T>this.object;
    }
    private updateValue(json : string)
    {
        const from = JSON.parse(json);
        this.deepClone(from, this.object);
    }
    private deepClone(from : object, to : object)
    {
        for(const key in to)
        {
            if(!from[key] || typeof from[key] == "function" || typeof to[key] == "function")
                delete to[key];
        }
        for(const key in from)
        {
            if(typeof from[key] == "object")
            {
                to[key] = this.deepClone(from[key], {});
            }
            else if(typeof from[key] != "function")
            {
                to[key] = from[key];
            }
        }
    }
}