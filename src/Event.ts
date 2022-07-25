export class JormunEvent<TPayload>
{
    private handlers: { handler: (payload: TPayload) => void, context: any }[] = [];
    public on(handler: (payload: TPayload) => void, context: any): void
    {
        this.handlers.push({ handler: handler, context: context });
    }
    public off(handler: (payload: TPayload) => void, context: any)
    {
        this.handlers = this.handlers.filter(h => h.handler !== handler || h.context !== context);
    }
    public trigger(payload: TPayload)
    {
        for (const handler of this.handlers)
        {
            handler.handler.call(handler.context, payload);
        }
    }
}