import {ILocal} from "./ILocal";
import { Key } from "./Key";

if (typeof localStorage === "undefined" || localStorage === null) 
{
    var ls = require('node-localstorage').LocalStorage;
    localStorage = new ls('./scratch');
}

export class LocalStorage implements ILocal
{
    private static KEYS_KEY = "$$KEYS$$";
    private keys : {[key : string] : number} = {};
    

    public constructor()
    {
        this.keys = JSON.parse(localStorage.getItem(LocalStorage.KEYS_KEY) ?? "{}");
    }

    private addKey(key : string)
    {
        if(!this.keys[key])
        {
            this.keys[key] = 1;
            localStorage.setItem(LocalStorage.KEYS_KEY, JSON.stringify(this.keys));
        }
    }
    private removeKey(key : string)
    {
        if(this.keys[key])
        {
            delete this.keys[key];
            localStorage.setItem(LocalStorage.KEYS_KEY, JSON.stringify(this.keys));
        }
    }

    public async getKeys(): Promise<Key[]> 
    {
        const result = [];
        for(const key in this.keys)
        {
            result.push(Key.parse(key, -1));
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