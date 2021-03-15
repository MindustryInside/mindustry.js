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

    async data(): Promise<ServerData> {
        return this.udp.connect(this.host.hostname, this.host.port)
            .then(() => this.udp.send(discoverPacket))
            .then(() => this.udp.awaitMessage())
            .then((data) => ServerView.from(data));
    }
}
