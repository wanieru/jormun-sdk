import {ILocal} from "./ILocal";
import { Key } from "./Key";

if (typeof localStorage === "undefined" || localStorage === null) 
{
    var ls = require('node-localstorage').LocalStorage;
    localStorage = new ls('./scratch');
}

export class LocalStorageWrap implements ILocal
{
    public static isAvailable()
    {
        try
        {
            const localStorage = new LocalStorageWrap();
            return true;
        }
        catch(e)
        {
            console.log(e);
            return false;
        }
    }
    private static KEYS_KEY = "$$KEYS$$";
    private static VER_KEY = "$$VERSION$$";
    private keys : {[key : string] : number} = {};
    private version : number;
    
    public constructor()
    {
        this.version = JSON.parse(localStorage.getItem(LocalStorageWrap.VER_KEY)) ?? 1;
        this.migrate();
        localStorage.setItem(LocalStorageWrap.VER_KEY, JSON.stringify(this.version));

        this.keys = JSON.parse(localStorage.getItem(LocalStorageWrap.KEYS_KEY) ?? "{}");
    }
    private migrate()
    {
        if(this.version == 1)
        {
            //Do upgrade from 1 to 2.
            //dummy example. Don't delete, though!! The first live version is 3.
            this.version++;
        }
        if(this.version == 2)
        {
            //Do upgrade from 2 to 3.
            //dummy example 2. Don't delete, though!! The first live version is 3.
            this.version++;
        }
    }

    private addKey(key : string)
    {
        if(!this.keys[key])
        {
            this.keys[key] = 1;
            localStorage.setItem(LocalStorageWrap.KEYS_KEY, JSON.stringify(this.keys));
        }
    }
    private removeKey(key : string)
    {
        if(this.keys[key])
        {
            delete this.keys[key];
            localStorage.setItem(LocalStorageWrap.KEYS_KEY, JSON.stringify(this.keys));
        }
    }

    public async getKeys(): Promise<Key[]> 
    {
        const result = [];
        for(const key in this.keys)
        {
            result.push(Key.parse(key, 0));
        }
        return result;
    }
    public async setValue(key: Key, value: any): Promise<void> 
    {
        const stringify = key.stringifyLocal();
        this.addKey(stringify);
        localStorage.setItem(stringify, JSON.stringify(value));
    }
    public async setValues(data: { [key: string]: any; }): Promise<void> 
    {
        for(const key in data)
        {
            this.addKey(key);
            localStorage.setItem(key, JSON.stringify(data[key]));
        }
    }
    public async getValue(key: Key): Promise<any> 
    {
        return JSON.parse(localStorage.getItem(key.stringifyLocal()));
    }
    public async getValues(keys: Key[]): Promise<{ [key: string]: any; }> 
    {
        const result = {};
        for(const i in keys)
        {
            result[keys[i].stringifyLocal()] = JSON.parse(localStorage.getItem(keys[i].stringifyLocal()));
        }
        return result;
    }
    public async removeValue(key: Key): Promise<void> 
    {
        this.removeKey(key.stringifyLocal());
        localStorage.removeItem(key.stringifyLocal());
    }
}