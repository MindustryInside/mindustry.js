import { Server } from './server';
import { defaultPort, localHost } from '../constants';

export class LocalServer extends Server {
    constructor(port = defaultPort) {
        super(localHost, port);
    }

    sendCommand(command: string): void {
        // TODO
    }
}
