import { Jormun } from "./Jormun";
import { Key } from "./Key";
import {Unix} from "./Unix";
export interface LocalData
{
    timestamp : number,
    isDirty : boolean,
    json : string
}
export class Data
{
    private key : Key;
    public constructor(key : Key)
    {
        this.key = key;
    }
    public async sync()
    {
        await Jormun.sync();
    }
    public async getRaw()
    {
        return <LocalData>await Jormun.local.getValue(this.key);
    }
    public async get()
    {
        const localData = await this.getRaw();
        return JSON.parse(localData.json);
    }
    public async set(value : any)
    {
        const localData : LocalData = 
        {
            timestamp : Unix(), 
            isDirty : true, 
            json : JSON.stringify(value)
        };
        await Jormun.local.setValue(this.key, localData);
    }
    public async setAndSync(value)
    {
        await this.set(value);
        await this.sync();
    }
    public getKey = () => this.key;
    public getFragment = () => this.key.fragment;
}