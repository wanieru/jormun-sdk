import { JormunEvent } from "./Event";
import { Jormun, JormunEventPayload } from "./Jormun";
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
    private async getEventPayload() : Promise<JormunEventPayload>
    {
        const payload : JormunEventPayload = 
        {
            data : this,
            raw : await this.getRaw(),
            value : await this.get(),
            key : this.getKey()
        };
        return payload;
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

        const keyString = this.key.stringifyLocal();
        if(Jormun.onDataChange[keyString])
        {
            const payload = await this.getEventPayload();
            Jormun.onDataChange[keyString].trigger(payload);
        }
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
    
    public onChange(handler : (payload : JormunEventPayload) => void) : number
    {
        const key = this.key.stringifyLocal();
        if(!Jormun.onDataChange[key])
            Jormun.onDataChange[key] = new JormunEvent<JormunEventPayload>();
        const id = Jormun.onDataChange[key].on(handler);
        this.getEventPayload().then(payload => handler(payload));
        return id;
    }
    public offChange(eventId : number)
    {
        const key = this.key.stringifyLocal();
        if(Jormun.onDataChange[key])
        {
            Jormun.onDataChange[key].off(eventId);
        }
    }
}