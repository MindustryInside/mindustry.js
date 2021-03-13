import { Host } from './host';

export class HostUnavailableError extends Error {
    constructor(host: Host) {
        super(`Host ${host.hostname}:${host.port} is unavailable.`);
    }
}
