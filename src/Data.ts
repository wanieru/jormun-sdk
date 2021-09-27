import { Jormun, JormunEventHandler } from "./Jormun";
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
    public async preset(value : any, timestamp : number, isDirty : boolean)
    {
        const localData : LocalData = 
        {
            timestamp : timestamp, 
            isDirty : isDirty, 
            json : JSON.stringify(value)
        };
        await Jormun.local.setValue(this.key, localData);
        await Jormun.triggerEvent(this);
    }
    public async set(value : any)
    {
        await this.preset(value, Unix(), true);
    }
    public async setAndSync(value : any)
    {
        await this.set(value);
        await this.sync();
    }
    public async remove()
    {
        await Jormun.local.removeValue(this.key);
    }
    public getKey = () => this.key;
    public getFragment = () => this.key.fragment;
    
    public on(handler : JormunEventHandler) : number
    {
        return Jormun.onUser(this.key.userId, this.key.fragment, handler);
    }
    public off(eventId : number)
    {
        Jormun.off(eventId);
    }
}