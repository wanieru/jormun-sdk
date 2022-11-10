export declare type JormunEventCallback<TPayload> = (payload: TPayload) => void | Promise<void>;
export declare class JormunEvent<TPayload> {
    private handlers;
    on(handler: JormunEventCallback<TPayload>, context: any): void;
    off(handler: JormunEventCallback<TPayload>, context: any): void;
    triggerAsync(payload: TPayload): Promise<void>;
    triggerSync(payload: TPayload): void;
}
