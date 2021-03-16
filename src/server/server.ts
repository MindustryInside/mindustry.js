import { ServerData, ServerView } from './data';
import { Host } from '../net/host';
import { NetConnection, SendMode } from '../net/net';
import { Packets } from '../net/packets';

export class Server extends NetConnection {
    static readonly port = 6567;
    static readonly socketPort = 6859;

    private host: Host;

    constructor(hostname: string, port = Server.port) {
        super();
        this.host = new Host(hostname, port);
    }

    /** @deprecated since 0.1.0 */
    data(): Promise<ServerData> {
        console.warn('Function Server#data() has been deprecated, please use Server#getData() function instead.');
        return this.getData();
    }

    getData(): Promise<ServerData> {
        return this.connect(this.host.hostname, this.host.port, SendMode.udp)
            .then(() => this.send(Packets.discoverHost, SendMode.udp))
            .then(() => this.awaitMessage(SendMode.udp))
            .then((data) => ServerView.from(data));
    }
}
