export declare class JormunEvent<TPayload> {
    private handlers;
    on(handler: (payload: TPayload) => void): number;
    off(id: number): void;
    trigger(payload: TPayload): void;
}
