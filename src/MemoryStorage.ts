import { ILocal } from "./ILocal";
import { Key } from "./Key";

export class MemoryStorage implements ILocal
{
    private data : {[key : string] : string};
    public async getKeys(): Promise<Key[]> 
    {
        const keys : Key[] = [];
        for(const key in this.data)
        {
            keys.push(Key.parse(key, 0));
        }
        return keys;
    }
    public async setValue(key: Key, value: any): Promise<void> 
    {
        this.data[key.stringifyLocal()] = JSON.stringify(value);
    }
    public async setValues(data: { [key: string]: any; }): Promise<void> 
    {
        for(const key in data)
        {
            await this.setValue(Key.parse(key, 0), data[key]);
        }
    }
    public async getValue(key: Key): Promise<any> 
    {
        const str = key.stringifyLocal();
        if(!this.data[str])
            return null;
        return JSON.parse(this.data[str]);
    }
    public async getValues(keys: Key[]): Promise<{ [key: string]: any; }> 
    {
        const obj : { [key: string]: any; } = {};
        for(const key of keys)
        {
            const str = key.stringifyLocal();
            obj[str] = await this.getValue(key);
        }
        return obj;
    }
    public async removeValue(key: Key): Promise<void> 
    {
        const str = key.stringifyLocal();
        if(this.data.hasOwnProperty(str))
            delete this.data[str];
    }

}