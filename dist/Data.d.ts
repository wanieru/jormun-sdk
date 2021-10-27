import { Publicity } from "./ApiTypes/Publish";
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
    private published;
    private sharedWith;
    private deleted;
    constructor(jormun: Jormun, key: Key);
    sync(): Promise<void>;
    getRaw(): Promise<LocalData>;
    get(): Promise<any>;
    private getEventPayload;
    preset(value: any, timestamp: number, published: Publicity, isDirty: boolean): Promise<void>;
    set(value: any): Promise<void>;
    setAndSync(value: any): Promise<void>;
    remove(): Promise<void>;
    getKey: () => Key;
    getFragment: () => string;
    onChange(handler: (payload: JormunEventPayload) => void): number;
    offChange(eventId: number): void;
    isPublished(): Publicity;
    getSharedWith(): number[];
    setSharedWith(sharedWith: number[], localUserId: number): void;
}
