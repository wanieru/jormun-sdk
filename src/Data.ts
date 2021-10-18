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
    private jormun : Jormun;
    private key : Key;
    private published : boolean = false;
    private sharedWith : number[];
    public constructor(jormun : Jormun, key : Key)
    {
        this.jormun = jormun;
        this.key = key;
    }
    public async sync()
    {
        await this.jormun.sync();
    }
    public async getRaw()
    {
        return <LocalData>await this.jormun.local.getValue(this.key);
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
    public async preset(value : any, timestamp : number, published : boolean, isDirty : boolean)
    {
        this.published = published;
        const localData : LocalData = 
        {
            timestamp : timestamp, 
            isDirty : isDirty, 
            json : JSON.stringify(value)
        };
        await this.jormun.local.setValue(this.key, localData);

        const keyString = this.key.stringifyLocal();
        if(this.jormun.onDataChange[keyString])
        {
            const payload = await this.getEventPayload();
            this.jormun.onDataChange[keyString].trigger(payload);
        }
    }
    public async set(value : any)
    {
        await this.preset(value, Unix(), this.published, true);
    }
    public async setAndSync(value : any)
    {
        await this.set(value);
        await this.sync();
    }
    public async remove()
    {
        await this.jormun.local.removeValue(this.key);
    }
    public getKey = () => this.key;
    public getFragment = () => this.key.fragment;
    
    public onChange(handler : (payload : JormunEventPayload) => void) : number
    {
        const key = this.key.stringifyLocal();
        if(!this.jormun.onDataChange[key])
            this.jormun.onDataChange[key] = new JormunEvent<JormunEventPayload>();
        const id = this.jormun.onDataChange[key].on(handler);
        this.getEventPayload().then(payload => handler(payload));
        return id;
    }
    public offChange(eventId : number)
    {
        const key = this.key.stringifyLocal();
        if(this.jormun.onDataChange[key])
        {
            this.jormun.onDataChange[key].off(eventId);
        }
    }
    public isPublished(){return this.published;}
    public getSharedWith(){return this.sharedWith;}
    public setSharedWith(sharedWith : number[]){this.sharedWith = sharedWith;}
}