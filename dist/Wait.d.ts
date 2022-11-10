export declare class Wait {
    static secs(time: number): Promise<void>;
    static until(callback: () => boolean): Promise<void>;
}
