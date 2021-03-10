import { Constants } from '../Constants';
import { UdpSocket } from '../net/Udp';
import { ServerData, ServerView } from './ServerData';
import { Endpoint } from '../net/Endpoint';
import { Address } from '../net/Address';

export class Server implements Endpoint {
    readonly address: Address;
    readonly port: number;

    constructor(address: Address, port: number = Constants.DEFAULT_PORT) {
        this.address = address;
        this.port = port;
    }

    async data(timeout = 2000): Promise<ServerData> {
        const socket = new UdpSocket(this.address, this.port);
        socket.setTimeout(timeout);

        const buffer = await socket.send(Constants.DISCOVER_PACKET);

        return new ServerView(buffer);
    }
}
