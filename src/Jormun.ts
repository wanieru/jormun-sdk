import { ILocal } from "./ILocal";
import {Pref} from "./Pref";
import * as bcrypt from "bcrypt";
import { IRemote } from "./IRemote";

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
    password : string
}
type AlertDelegate = (message : string, options : string[]) => Promise<number>;
export class Jormun
{
    private static alertDelegate : AlertDelegate;

    private static options : JormunOptions;
    private static local : ILocal;
    private static remote : IRemote;
    private static remoteOptions : Pref<JormunRemote>;

    public static initialize(app : string)
    {
        this.remoteOptions = new Pref<JormunRemote>("$$$jormun_remote$$$", true);
        if(this.remoteOptions.get() != null)
        {
            this.setup({app:app, type : "LocalAndRemote", remote : this.remoteOptions.get()});
        }
        else
        {
            this.setup({app: app, type : "LocalOnly", remote: null});
        }
    }
    public static async login(remote : JormunRemote)
    {
        remote.password = await bcrypt.hash(remote.password, "");
        this.setup({app:this.options.app, type : "LocalAndRemote", remote : this.remoteOptions.get()});
    }

    private static setup(options : JormunOptions)
    {
        this.options = options;
        //Set local implementation.
        if(options.type == "LocalAndRemote")
        {
            //Set remote implementation
        }
        
    }
    public static hashedRemote = () => this.remoteOptions.get();

    public static async alert(message : string)
    {
        return this.alertDelegate(message, []);
    }
    public static setAlertDelegate(resolver : AlertDelegate)
    {
        this.alertDelegate = resolver;
    }
}