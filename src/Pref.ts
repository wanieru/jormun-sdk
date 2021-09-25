if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

export class Pref<T>
{
    private key : string;
    private value : T | null;
    private cache : boolean;
    public constructor(key : string, cache : boolean)
    {
        this.key = key;
        this.value = null;
        this.cache = cache;
    }
    public get() : T
    {
        const value = this.value ?? JSON.parse(localStorage.getItem(this.key));
        if(!this.value && this.cache)
            this.value = value;
        return value;
    }
    public set(value : T)
    {
        if(this.cache)
            this.value = value;
        localStorage.setItem(this.key, JSON.stringify(value));
    }
    public remove()
    {
        this.value = null;
        localStorage.removeItem(this.key);
    }
}