import { Jormun, JormunEventPayload } from "./Jormun";
import { Key } from "./Key";
export interface LocalData {
    timestamp: number;
    isDirty: boolean;
    json: string;
}
export declare class Data {
    private jormun;
    private key;
    constructor(jormun: Jormun, key: Key);
    sync(): Promise<void>;
    getRaw(): Promise<LocalData>;
    get(): Promise<any>;
    private getEventPayload;
    preset(value: any, timestamp: number, isDirty: boolean): Promise<void>;
    set(value: any): Promise<void>;
    setAndSync(value: any): Promise<void>;
    remove(): Promise<void>;
    getKey: () => Key;
    getFragment: () => string;
    onChange(handler: (payload: JormunEventPayload) => void): number;
    offChange(eventId: number): void;
}
