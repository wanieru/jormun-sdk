export declare class Key {
    app: string;
    userId: number;
    fragment: string;
    constructor(app: string, userId: number, fragment: string);
    static parse(json: string): Key;
    stringify(): string;
}
