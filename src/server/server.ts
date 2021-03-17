import { ServerData, ServerView } from './data';
import { Host } from '../net/host';
import { NetConnection, SendMode } from '../net/net';
import { Packet, Packets } from '../net/packets';

export const defaultHost: Host = {
    hostname: 'localhost',
    port: 6567,
};

export const defaultSocketInput: Host = {
    hostname: 'localhost',
    port: 6859,
};

export class Server {
    private con: NetConnection = new NetConnection();

    constructor(
        private main: Host,
        private socketInput?: Host,
    ) {}

    /** @deprecated since 0.1.0 */
    data(): Promise<ServerData> {
        console.warn('Function Server#data() has been deprecated, please use Server#getData() function instead.');
        return this.getData();
    }

    getData(): Promise<ServerData> {
        return this.con.connect(this.main.hostname, this.main.port, SendMode.udp)
            .then(() => this.con.send(Packets.discoverHost, SendMode.udp))
            .then(() => this.con.awaitMessage(SendMode.udp))
            .then((data) => ServerView.from(data));
    }

    handleCommand(command: string): Promise<void> {
        if (!this.socketInput) {
            throw new Error('Server\'s socket input data not provided.');
        }

        return this.con.connect(this.socketInput.hostname, this.socketInput.port, SendMode.tcp)
            .then(() => this.con.send(Packet.from(`${command}\n`), SendMode.tcp));
    }
}
