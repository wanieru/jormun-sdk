import {ILocal} from "./ILocal";
import { Key } from "./Key";
export class LocalStorage implements ILocal
{

    public async getKeys(): Promise<Key[]> 
    {
        throw new Error("Method not implemented.");
    }
    public async setValue(key: Key, value: any): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
    public async setValues(data: { [key: string]: any; }): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }
    public async getValue(key: Key): Promise<any> 
    {
        throw new Error("Method not implemented.");
    }
    public async getValues(keys: Key[]): Promise<{ [key: string]: any; }> 
    {
        throw new Error("Method not implemented.");
    }
    public async removeValue(key: Key): Promise<void> 
    {
        throw new Error("Method not implemented.");
    }

}