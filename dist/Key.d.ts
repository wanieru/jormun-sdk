/** Represents the key of some data. */
export declare class Key {
    /** The app-component of the key. */
    app: string;
    /** The userId-component of the key. Always 0 if the data belongs to the local user. */
    userId: number;
    /** The unique fragment-component of the key. */
    fragment: string;
    constructor(app: string, userId: number, fragment: string);
    /** Parse a stringified key. If the stringified key belongs to the specified remoteId, the userId will instead be 0. Returns null if the key is malformed. */
    static parse(json: string, remoteId: number): Key | null;
    static parseAll(jsons: string[], remoteId: number): Key[];
    /** Stringify the key for local use. If userId is 0, it will remain 0. */
    stringifyLocal(): string;
    /** Stringify the key for remote use. If userId is 0, it will instead be the specified remoteId. RemoteId should be the userId gotten from remote's "status". */
    stringifyRemote(remoteId: number): string;
}
