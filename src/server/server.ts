import { ServerData, ServerView } from './server-data';
import { Connection } from '../net/core/connection';
import { DiscoverHost, Packet } from '../net/core/packets';

export interface NetAddress {
    hostname: string;
    port: number;
}

const defaultHost: NetAddress = {
    hostname: 'localhost',
    port: 6567,
};

const defaultSocketInput: NetAddress = {
    hostname: 'localhost',
    port: 6859,
};

export class Server extends Connection {
    private readonly main: NetAddress;
    private readonly socketInput!: NetAddress;

    constructor();
    constructor(main: NetAddress);
    constructor(main: NetAddress, socketInput: NetAddress);
    constructor(hostname: string, port: number);

    constructor(...args: NetAddress[] | [string, number]) {
        super();

        if (typeof args[0] === 'string' && typeof args[1] === 'number') {
            const hostname = args[0];
            const port = args[1];

            this.main = { hostname, port };
            this.socketInput = defaultSocketInput;
        } else {
            if (args[0]) {
                this.main = args[0] as NetAddress;
            } else {
                this.main = defaultHost;
                this.socketInput = defaultSocketInput;
            }

            if (args[1]) {
                this.socketInput = args[1] as NetAddress;
            }
        }
    }

    /** @deprecated since 0.1.0 */
    data(): Promise<ServerData> {
        console.warn('Function Server#data() has been deprecated, please use Server#getData() function instead.');
        return this.getData();
    }

    getData(): Promise<ServerData> {
        return new Promise<ServerData>((resolve, reject) => {
            this.connectUDP(this.main.hostname, this.main.port)
                .then(() => {
                    this.addListener({
                        received(con: Connection, packet: Packet) {
                            resolve(ServerView.read(packet.getData()));
                        },
                    });
                })
                .then(() => void this.sendUDP(new DiscoverHost()))
                .catch(reject);
        });
    }

    // TODO
    // handleCommand(command: string): Promise<void> {
    //     return this.con.connect(this.socketInput.hostname, this.socketInput.port, SendMode.tcp)
    //         .then(() => this.con.send(Packet.from(`${command}\n`), SendMode.tcp));
    //     return Promise.resolve();
    // }
}
