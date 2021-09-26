import { ILocal } from "./ILocal";
import * as bcrypt from "bcrypt";
import { IRemote } from "./IRemote";
import { Data } from "./Data";
import { Key } from "./Key";

export interface JormunOptions
{
    app : string,
    type : "LocalOnly" | "LocalAndRemote",
    remote? : JormunRemote
}
export interface JormunRemote
{
    host : string,
    username : string,
    password : string,
    downloadSharedData : boolean
}
export interface JormunDataSet
{
    [fragment:string] : Data
}
type AlertDelegate = (message : string, options : string[]) => Promise<number>;
export class Jormun
{
    private static REMOTE_SETTINGS_KEY : Key;

    private static alertDelegate : AlertDelegate;

    private static options : JormunOptions;
    public static local : ILocal;
    public static remote : IRemote;
    private static data : {local:JormunDataSet, [id:number] : JormunDataSet};

    public static async initialize(app : string)
    {
        //TODO: Set local implementation.
        this.REMOTE_SETTINGS_KEY = new Key(app, -9999, "REMOTE_SETTINGS");
        this.data = {local:{}};
        if(this.local.getValue(this.REMOTE_SETTINGS_KEY) != null)
        {
            await this.setup({app:app, type : "LocalAndRemote", remote : await this.local.getValue(this.REMOTE_SETTINGS_KEY)});
        }
        else
        {
            await this.setup({app: app, type : "LocalOnly", remote: null});
        }
    }
    public static async login(remote : JormunRemote)
    {
        remote.password = await bcrypt.hash(remote.password, "");
        await this.local.setValue(this.REMOTE_SETTINGS_KEY, remote);
        await this.setup({app:this.options.app, type : "LocalAndRemote", remote : remote});
    }
    public static async sync()
    {
        //Gather info

        let download = false;
        //If there are any newer timestamps on the server, or keys that are only on either side, download is true

        let upload = false;
        //If there are any newer timestamps locally or any dirty, or keys that are only on either side, upload is true


        //If both upload and download are true, ask what to do.
        //Do one of them, downloading or uploading only the neccessary data.

        //Alawys redownload shared keys if remote options allows it.
    }
    

    private static async setup(options : JormunOptions)
    {
        this.options = options;
        if(options.type == "LocalAndRemote")
        {
            //TODO: Set remote implementation
        }
        const localKeys = await this.local.getLocalFragments();
        const sharedKeys = await this.local.getSharedKeys();
        const newData = {local:{}};
        
        for(const existingFragment in this.data.local)
        {
            const key = new Key(options.app, -1, existingFragment);
            if(!localKeys[key.stringify()])
            {
                delete this.data.local[existingFragment];
            }
        }
        for(const key in localKeys)
        {
            const parsed = Key.parse(key);
            newData.local[parsed.fragment] = this.data.local[parsed.fragment] ?? new Data(parsed);
        }

        //Setup data objects based on local keys.
        //Continue the todo list. Access the data keys directly. 
        //Sould self-keys (fragments) have prefixes?
    }
    public static hashedRemote = () => this.local.getValue(this.REMOTE_SETTINGS_KEY);

    public static async alert(message : string)
    {
        return this.alertDelegate(message, []);
    }
    public static setAlertDelegate(resolver : AlertDelegate)
    {
        this.alertDelegate = resolver;
    }
}