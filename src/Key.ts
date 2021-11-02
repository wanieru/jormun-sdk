/** Represents the key of some data. */
export class Key
{
    /** The app-component of the key. */
    public app: string;
    /** The userId-component of the key. Always 0 if the data belongs to the local user. */
    public userId: number;
    /** The unique fragment-component of the key. */
    public fragment : string
    public constructor(app : string, userId : number, fragment : string)
    {
        this.app = app;
        this.userId = userId;
        this.fragment = fragment;
    }
    /** Parse a stringified key. If the stringified key belongs to the specified remoteId, the userId will instead be 0. Returns null if the key is malformed. */
    public static parse(json : string, remoteId : number)
    {
        const parsed = <any[]>JSON.parse(json);
        if(!Array.isArray(parsed))
            return null;
        if(parsed.length != 3)
            return null;
        if(isNaN(parseInt(parsed[1])))
            return null;
        const key = new Key(parsed[0].toString(), parseInt(parsed[1]), parsed[2].toString());
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
    /** Stringify the key for local use. If userId is 0, it will remain 0. */
    public stringifyLocal()
    {
        return JSON.stringify([this.app.toString(), parseInt(<any>this.userId), this.fragment.toString()]);
    }
    /** Stringify the key for remote use. If userId is 0, it will instead be the specified remoteId. RemoteId should be the userId gotten from remote's "status". */
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