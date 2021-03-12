export enum ContentType {
    item,
    block,
    liquid,
}

export abstract class Content {
    constructor(
        public name: string,
    ) {}

    abstract get contentType(): ContentType;

    toString(): string {
        return this.name;
    }
}
