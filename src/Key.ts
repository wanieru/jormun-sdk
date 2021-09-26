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
    public static parse(json : string)
    {
        const parsed = <Key>JSON.parse(json); //Not actually a key instance
        const key = new Key(parsed.app, parsed.userId, parsed.app);
        return key;
    }
    public stringify()
    {
        return JSON.stringify(this);
    }
}