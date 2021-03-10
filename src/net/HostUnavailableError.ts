import { Endpoint } from './Endpoint';

export class HostUnavailableError extends Error {
    constructor(endpoint: Endpoint) {
        super(`Host ${endpoint.address}:${endpoint.port} is unavailable.`);
    }
}
