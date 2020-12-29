import { Address } from './Address';

export interface Endpoint {
    readonly address: Address;
    readonly port: number;
}
