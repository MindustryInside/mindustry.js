import { Host } from './host';

export class NetException extends Error {}

export class HostUnavailableException extends NetException {
    constructor(host: Host) {
        super(`Host ${host.hostname}:${host.port} is unavailable.`);
    }
}
