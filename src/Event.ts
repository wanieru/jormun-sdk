export type JormunEventCallback<TPayload> = (payload: TPayload) => void | Promise<void>;
export class JormunEvent<TPayload>
{
    private handlers: { handler: JormunEventCallback<TPayload>, context: any }[] = [];
    public on(handler: JormunEventCallback<TPayload>, context: any): void
    {
        this.handlers.push({ handler: handler, context: context });
    }
    public off(handler: JormunEventCallback<TPayload>, context: any)
    {
        this.handlers = this.handlers.filter(h => h.handler !== handler || h.context !== context);
    }
    public async triggerAsync(payload: TPayload)
    {
        for (const handler of this.handlers)
        {
            const result = handler.handler.call(handler.context, payload);
            if (!!result && typeof result === "object") await result;
        }
    }
    public triggerSync(payload: TPayload)
    {
        for (const handler of this.handlers)
        {
            handler.handler.call(handler.context, payload);
        }
    }
}