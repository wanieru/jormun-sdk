import { Jormun } from "./Jormun";
import { Pref } from "./Pref";

interface StoredData<T>
{
    timestamp : number,
    data : T
}
export class Data
{
    private jormun : Jormun;
    private key : string;
    private object = {};
    private pref : Pref<StoredData<string>>;

    public constructor(jormun : Jormun, key : string)
    {
        this.jormun = jormun;
        this.key = key;
        this.object = {};
        this.pref = new Pref(this.key);
    }
    public async get() //Generic or something??
    {

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