import { getTokenSourceMapRange } from "typescript";
import { ILocal } from "./ILocal";
import { Key } from "./Key";

export class IndexedDBWrap implements ILocal
{
    public static isAvailable = async (app: string) => 
    {
        try
        {
            const indexedDb: IndexedDBWrap = new IndexedDBWrap(app);
            const db = await indexedDb.db();
            return true;
        }
        catch (e)
        {
            console.log(e);
            return false;
        }
    }

    private app: string;
    private _db: IDBDatabase;
    public constructor(app: string)
    {
        this.app = app;
    }
    private migrate(db: IDBDatabase)
    {
        if (!db.objectStoreNames.contains("v1"))
        {
            db.createObjectStore("v1");
            db.createObjectStore("data", { keyPath: "key" });
        }
        //Add more by checking and creating v2, v3 etc...
    }
    private async db()
    {
        if (!this._db)
        {
            this._db = await this.createDb(this.migrate);
        }
        return this._db;
    }
    private async createDb(upgrade: (db: IDBDatabase) => void)
    {
        return new Promise<IDBDatabase>((resolve, reject) => 
        {
            const request = window.indexedDB.open(this.app, 1);
            request.onupgradeneeded = () => upgrade(request.result);
            request.onsuccess = () => resolve(request.result);
            request.onerror = (ev) => reject(ev);
        });
    }
    private async request<T>(req: IDBRequest<T>)
    {
        return new Promise<T>((resolve, reject) => 
        {
            req.onsuccess = () => resolve(req.result);
            req.onerror = (ev) => reject(ev);
        });
    }
    public async getKeys(): Promise<Key[]> 
    {
        const db = await this.db();
        const tx = db.transaction("data", "readonly");
        const store = tx.objectStore("data");
        const all = await this.request(store.getAllKeys());
        const result: Key[] = [];
        for (const key of all)
        {
            const parsed = Key.parse(<string>key.valueOf(), -1);
            if (!parsed) continue;
            result.push(parsed);
        }
        return result;
    }
    public async setValue(key: Key, value: any): Promise<void> 
    {
        const db = await this.db();
        const tx = db.transaction("data", "readwrite");
        const store = tx.objectStore("data");
        await this.request(store.put({ "key": key.stringifyLocal(), "value": JSON.stringify(value) }));
    }
    public async setValues(data: { [key: string]: any; }): Promise<void> 
    {
        const db = await this.db();
        const tx = db.transaction("data", "readwrite");
        const store = tx.objectStore("data");
        for (const key in data)
        {
            await this.request(store.put({ "key": key, "value": JSON.stringify(data[key]) }));
        }
    }
    public async getValue(key: Key): Promise<any> 
    {
        const db = await this.db();
        const tx = db.transaction("data", "readonly");
        const store = tx.objectStore("data");
        const record = await this.request(store.get(key.stringifyLocal()));
        if (!record)
            return null;
        return JSON.parse(record.value);
    }
    public async getValues(keys: Key[]): Promise<{ [key: string]: any; }> 
    {
        const result = {};
        const db = await this.db();
        const tx = db.transaction("data", "readonly");
        const store = tx.objectStore("data");
        for (const key of keys)
        {
            const stringify = key.stringifyLocal();
            const record = await this.request(store.get(stringify));
            result[stringify] = JSON.parse(record.value);
        }
        return result;
    }
    public async removeValue(key: Key): Promise<void> 
    {
        const db = await this.db();
        const tx = db.transaction("data", "readwrite");
        const store = tx.objectStore("data");
        await this.request(store.delete(key.stringifyLocal()));
    }

}