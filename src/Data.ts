import { Publicity } from "./ApiTypes/Publish";
import { JormunEvent } from "./Event";
import { Jormun, JormunDataUsers, JormunEventPayload } from "./Jormun";
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
    private published : Publicity = "private";
    private sharedWith : number[] = [];
    private deleted = false;
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
        return <LocalData>await this.jormun["local"].getValue(this.key);
    }
    public async get()
    {
        const localData = await this.getRaw();
        if(!localData)
            return null;
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
    public async preset(value : any, timestamp : number, published : Publicity, isDirty : boolean)
    {
        if(this.deleted)
            return;
        this.published = published;
        const localData : LocalData = 
        {
            timestamp : timestamp, 
            isDirty : isDirty, 
            json : JSON.stringify(value)
        };
        await this.jormun["local"].setValue(this.key, localData);

        const keyString = this.key.stringifyLocal();
        if(this.jormun.onDataChange.hasOwnProperty(keyString))
        {
            const payload = await this.getEventPayload();
            this.jormun.onDataChange[keyString].trigger(payload);
        }
    }
    public async set(value : any)
    {
        const raw = await this.getRaw();
        await this.preset(value, raw.timestamp, this.published, true);
    }
    public async setAndSync(value : any)
    {
        await this.set(value);
        await this.sync();
    }
    public async remove()
    {
        if(this.getFragment() == Jormun.CHANGED_KEYS_KEY)
            return;
        await this.jormun["local"].removeValue(this.key);
        delete this.jormun["data"][this.key.userId][this.key.fragment];
        await this.jormun.bumpChangedKeys();
        this.deleted = true;
    }
    public getKey = () => this.key;
    public getFragment = () => this.key.fragment;
    
    public onChange(handler : (payload : JormunEventPayload) => void) : number
    {
        const key = this.key.stringifyLocal();
        if(!this.jormun.onDataChange.hasOwnProperty(key))
            this.jormun.onDataChange[key] = new JormunEvent<JormunEventPayload>();
        const id = this.jormun.onDataChange[key].on(handler);
        this.getEventPayload().then(payload => handler(payload));
        return id;
    }
    public offChange(eventId : number)
    {
        const key = this.key.stringifyLocal();
        if(this.jormun.onDataChange.hasOwnProperty(key))
        {
            this.jormun.onDataChange[key].off(eventId);
        }
    }
    public isPublished(){return this.published;}
    public getSharedWith(){return this.sharedWith;}
    public setSharedWith(sharedWith : number[], localUserId : number)
    {
        this.sharedWith = sharedWith;
        for(const i in this.sharedWith)
        {
            if(this.sharedWith[i] == localUserId)
                this.sharedWith[i] = 0;
        }
    }
}