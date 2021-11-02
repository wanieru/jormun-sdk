import { Publicity } from "./ApiTypes/Publish";
import { Jormun, JormunEventPayload } from "./Jormun";
import { Key } from "./Key";
export interface LocalData {
    timestamp: number;
    isDirty: boolean;
    json: string;
}
/** Represents a piece of data, which can be loaded and set. */
export declare class Data {
    private jormun;
    private key;
    private published;
    private sharedWith;
    private deleted;
    constructor(jormun: Jormun, key: Key);
    /** Gets the raw data, including metadata like timestamp and dirty status. */
    getRaw(): Promise<LocalData>;
    /** Loads and parses this value. */
    get(): Promise<any>;
    private getEventPayload;
    /** Preset data AND metadata. */
    preset(value: any, timestamp: number, published: Publicity, isDirty: boolean): Promise<void>;
    /** Set this value. */
    set(value: any): Promise<void>;
    /** Delete this value locally. */
    remove(): Promise<void>;
    private fireChangeEvent;
    /** Gets this data's key. */
    getKey: () => Key;
    /** Gets the fragment of this data's key. */
    getFragment: () => string;
    /** Bind an event to be triggered whenever this data's value is changed. Returns an id used to unsubscribe again. */
    onChange(handler: (payload: JormunEventPayload) => void): number;
    /** Unsubscribe the bound event with the specified event Id. */
    offChange(eventId: number): void;
    /** Gets the publicity of this data on the remote. */
    isPublished(): Publicity;
    /** Gets a list of user ids this data is shared with. */
    getSharedWith(): number[];
    /** Preset the ids of the users this data is shared with. */
    setSharedWith(sharedWith: number[], localUserId: number): void;
}
