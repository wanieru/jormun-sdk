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
        const parsed = <any[]>JSON.parse(json);
        const key = new Key(parsed[0], parsed[1], parsed[2]);
        if(key.userId == remoteId)
            key.userId = 0;
        return key;
    }
    public static parseAll(jsons : string[], remoteId : number)
    {
        const result : Key[] = [];
        for(const json of jsons)
        {
            result.push(Key.parse(json, remoteId));
        }
        return result;
    }
    public stringifyLocal()
    {
        return JSON.stringify([this.app, this.userId, this.fragment]);
    }
    public stringifyRemote(remoteId : number)
    {
        const originalId = this.userId;
        if(this.userId == 0)
            this.userId = remoteId;
        const json = this.stringifyLocal();
        this.userId = originalId;
        return json;
    }
}