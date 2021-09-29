export declare class Key {
    app: string;
    userId: number;
    fragment: string;
    constructor(app: string, userId: number, fragment: string);
    static parse(json: string, remoteId: number): Key;
    static parseAll(jsons: string[], remoteId: number): Key[];
    stringifyLocal(): string;
    stringifyRemote(remoteId: number): string;
}
