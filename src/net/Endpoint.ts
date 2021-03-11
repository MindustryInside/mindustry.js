import { Address } from './Address';

export class Endpoint {
    constructor(
        public readonly address: Address,
        public readonly port: number,
    ) {}

    static with(address: Address, port: number): Endpoint {
        return new Endpoint(address, port);
    }

    equals(endpoint: Endpoint): boolean {
        return this.address === endpoint.address && this.port === endpoint.port;
    }
}
