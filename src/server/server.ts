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

    private readonly main: Host;
    private readonly socketInput!: Host;

    constructor();
    constructor(main: Host);
    constructor(main: Host, socketInput: Host);
    constructor(hostname: string, port: number);

    constructor(...args: Host[] | [string, number]) {
        if (typeof args[0] === 'string' && typeof args[1] === 'number') {
            const hostname = args[0];
            const port = args[1];

            this.main = { hostname, port };
            this.socketInput = defaultSocketInput;
        } else {
            if (args[0]) {
                this.main = args[0] as Host;
            } else {
                this.main = defaultHost;
                this.socketInput = defaultSocketInput;
            }

            if (args[1]) {
                this.socketInput = args[1] as Host;
            }
        }
    }

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
        return this.con.connect(this.socketInput.hostname, this.socketInput.port, SendMode.tcp)
            .then(() => this.con.send(Packet.from(`${command}\n`), SendMode.tcp));
    }
}
