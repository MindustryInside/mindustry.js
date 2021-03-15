export class NetException extends Error {
    constructor(message: string);
    constructor(error: Error);
    constructor(error: Error | string) {
        super(error instanceof Error ? error.message : error);
    }
}
