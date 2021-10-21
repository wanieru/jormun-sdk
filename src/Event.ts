export class JormunEvent<TPayload>
{
    private handlers : ((payload : TPayload) => void)[] = [];
    public on(handler : (payload : TPayload) => void) : number
    {
        const id = this.handlers.length;
        this.handlers.push(handler);
        return id;
    }
    public off(id : number)
    {
        this.handlers[id] = null;
    }
    public trigger(payload : TPayload)
    {
        for(const id in this.handlers)
        {
            if(this.handlers.hasOwnProperty(id))
                this.handlers[id](payload);
        }
    }
}