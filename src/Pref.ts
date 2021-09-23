if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

export class Pref<T>
{
    private key : string;
    private value : T | null;
    public constructor(key : string)
    {
        this.key = key;
        this.value = null;
    }
    public get() : T
    {
        if(!this.value)
            this.value = JSON.parse(localStorage.getItem(this.key));
        return this.value;
    }
    public set(value : T)
    {
        this.value = value;
        localStorage.setItem(this.key, JSON.stringify(this.value));
    }
    public remove()
    {
        this.value = null;
        localStorage.removeItem(this.key);
    }
}