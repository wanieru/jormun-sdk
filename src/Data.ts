import { Publicity } from "./ApiTypes/Publish";
import { JormunEvent } from "./Event";
import { Jormun, JormunDataUsers, JormunEventPayload } from "./Jormun";
import { Key } from "./Key";
import { Unix } from "./Unix";
export interface LocalData
{
    timestamp: number,
    isDirty: boolean,
    json: string
}
/** Represents a piece of data, which can be loaded and set. */
export class Data
{
    private jormun: Jormun;

    private key: Key;
    private published: Publicity = "private";
    private sharedWith: number[] = [];
    private deleted = false;
    public constructor(jormun: Jormun, key: Key)
    {
        this.jormun = jormun;
        this.key = key;
    }
    /** Gets the raw data, including metadata like timestamp and dirty status. */
    public async getRaw()
    {
        return <LocalData | null>await this.jormun["local"].getValue(this.key);
    }
    /** Loads and parses this value. */
    public async get()
    {
        const localData = await this.getRaw();
        if (!localData)
            return null;
        return JSON.parse(localData.json);
    }
    private async getEventPayload(): Promise<JormunEventPayload>
    {
        if (this.deleted)
        {
            const payload: JormunEventPayload =
            {
                data: this,
                raw: null,
                value: null,
                key: this.getKey()
            };
            return payload;
        }
        const payload: JormunEventPayload =
        {
            data: this,
            raw: await this.getRaw(),
            value: await this.get(),
            key: this.getKey()
        };
        return payload;
    }
    /** Preset data AND metadata. */
    public async preset(value: any, timestamp: number, published: Publicity, isDirty: boolean)
    {
        if (this.deleted)
            return;
        const oldValue = await this.getRaw();
        this.published = published;
        const localData: LocalData =
        {
            timestamp: timestamp,
            isDirty: isDirty,
            json: JSON.stringify(value)
        };
        await this.jormun["local"].setValue(this.key, localData);

        if (oldValue?.json !== localData.json)
        {
            await this.fireChangeEvent();
        }
    }
    /** Set this value. */
    public async set(value: any)
    {
        const raw = await this.getRaw();
        await this.preset(value, raw?.timestamp ?? Unix(), this.published, true);
    }
    /** Delete this value locally. */
    public async remove()
    {
        if (this.getFragment() == Jormun.CHANGED_KEYS_KEY)
            return;
        await this.jormun["local"].removeValue(this.key);
        delete this.jormun["data"][this.key.userId][this.key.fragment];
        await this.jormun.bumpChangedKeys();
        this.deleted = true;
        await this.fireChangeEvent();
    }
    private fireChangeEvent = async () => 
    {
        const keyString = this.key.stringifyLocal();
        const onDataChange = this.jormun["onDataChange"];
        const payload = await this.getEventPayload();
        await this.jormun.onAnyDataChange.triggerAsync(payload);
        if (onDataChange.hasOwnProperty(keyString))
        {
            await onDataChange[keyString].triggerAsync(payload);
        }
    }
    /** Gets this data's key. */
    public getKey = () => this.key;
    /** Gets the fragment of this data's key. */
    public getFragment = () => this.key.fragment;

    /** Bind an event to be triggered whenever this data's value is changed. */
    public onChange(handler: (payload: JormunEventPayload) => void, context: any)
    {
        const key = this.key.stringifyLocal();
        const onDataChange = this.jormun["onDataChange"];
        if (!onDataChange.hasOwnProperty(key))
            onDataChange[key] = new JormunEvent<JormunEventPayload>();
        onDataChange[key].on(handler, context);
        this.getEventPayload().then(payload => handler.call(context, payload));
    }
    /** Unsubscribe the bound event with the specified event Id. */
    public offChange(handler: (payload: JormunEventPayload) => void, context: any)
    {
        const key = this.key.stringifyLocal();
        const onDataChange = this.jormun["onDataChange"];
        if (onDataChange.hasOwnProperty(key))
        {
            onDataChange[key].off(handler, context);
        }
    }
    /** Gets the publicity of this data on the remote. */
    public isPublished() { return this.published; }
    /** Gets a list of user ids this data is shared with. */
    public getSharedWith() { return this.sharedWith; }
    /** Preset the ids of the users this data is shared with. */
    public setSharedWith(sharedWith: number[], localUserId: number)
    {
        this.sharedWith = sharedWith;
        for (const i in this.sharedWith)
        {
            if (this.sharedWith[i] == localUserId)
                this.sharedWith[i] = 0;
        }
    }
}