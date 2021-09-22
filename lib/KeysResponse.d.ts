export default interface KeysResponse {
    keys: {
        [key: string]: string;
    };
    shared_with_me: {
        [key: string]: string;
    };
}
