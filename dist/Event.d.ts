export declare class JormunEvent<TPayload> {
    private handlers;
    on(handler: (payload: TPayload) => void, context: any): void;
    off(handler: (payload: TPayload) => void, context: any): void;
    trigger(payload: TPayload): void;
}
