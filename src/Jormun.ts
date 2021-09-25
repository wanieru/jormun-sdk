import { ILocal } from "./ILocal";
import * as bcrypt from "bcrypt";
import { IRemote } from "./IRemote";
import { Data } from "./Data";

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
    private static REMOTE_SETTINGS_KEY = "$$$jormun_remote$$$";

    private static alertDelegate : AlertDelegate;

    private static options : JormunOptions;
    public static local : ILocal;
    public static remote : IRemote;
    private static data : {local:JormunDataSet, [id:number] : JormunDataSet};

    public static async initialize(app : string)
    {
        //TODO: Set local implementation.
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
    public static async syncAll()
    {
        const dataArray : Data[] = [];
        for(const user in this.data)
        {
            for(const fragment in this.data[user])
            {
                dataArray.push(this.data[user][fragment]);
            }
        }
        await this.sync(dataArray);
    }
    public static async sync(data : Data[])
    {
        //TODO: implement this :D
    }
    

    private static async setup(options : JormunOptions)
    {
        this.options = options;
        if(options.type == "LocalAndRemote")
        {
            //TODO: Set remote implementation
        }
        const localFragments = await this.local.getLocalFragments();
        const sharedKeys = await this.local.getSharedKeys();
        const newData = {local:{}};
        
        for(const fragment in localFragments)
        {
            newData.local[fragment] = this.data.local[fragment] ?? new Data("", fragment);
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