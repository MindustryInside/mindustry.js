export class Host {
    constructor(
        public hostname: string,
        public port: number,
    ) {}

    toString(): string {
        return `${this.hostname}:${this.port}`;
    }
}
