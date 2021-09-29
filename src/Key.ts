export class Key
{
    public app: string;
    public userId: number;
    public fragment : string
    public constructor(app : string, userId : number, fragment : string)
    {
        this.app = app;
        this.userId = userId;
        this.fragment = fragment;
    }
    public static parse(json : string, remoteId : number)
    {
        const parsed = <Key>JSON.parse(json); //Not actually a key instance
        const key = new Key(parsed.app, parsed.userId, parsed.app);
        if(key.userId == remoteId)
            key.userId = -1;
        return key;
    }
    public static parseAll(jsons : string[], remoteId : number)
    {
        const result = [];
        for(const json of jsons)
        {
            result.push(Key.parse(json, remoteId));
        }
        return result;
    }
    public stringifyLocal()
    {
        return JSON.stringify(this);
    }
    public stringifyRemote(remoteId : number)
    {
        const originalId = this.userId;
        if(this.userId == -1)
            this.userId = remoteId;
        const json = JSON.stringify(this);
        this.userId = originalId;
        return json;
    }
}