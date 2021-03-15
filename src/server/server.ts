import { defaultPort, discoverPacket } from '../constants';
import { ServerData, ServerView } from './data';
import { Host } from '../net/host';
import { NetConnection } from '../net/net';

export class Server extends NetConnection {
    private host: Host;

    constructor(hostname: string, port = defaultPort) {
        super();
        this.host = new Host(hostname, port);
    }

    /** @deprecated since 0.1.0 */
    async data(): Promise<ServerData> {
        console.warn('Function Server#data() has been deprecated, please use Server#getData() function instead.');
        return this.getData();
    }

    async getData(): Promise<ServerData> {
        return this.udp.connect(this.host.hostname, this.host.port)
            .then(() => this.udp.send(discoverPacket))
            .then(() => this.udp.awaitMessage())
            .then((data) => ServerView.from(data));
    }
}
