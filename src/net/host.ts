// export type IPv4 =
//     `${number}.${number}.${number}.${number}`;
//
// export type IPv6 =
//     `${number}:${number}:${number}:${number}:${number}:${number}:${number}:${number}`;
//
// export type IP = IPv4 | IPv6;

export class Host {
    constructor(
        public readonly hostname: string,
        public readonly port: number,
    ) {}

    equals(host: string, port: number): boolean {
        return this.hostname === host && this.port === port;
    }

    toString(): string {
        return `${this.hostname}:${this.port}`;
    }
}
