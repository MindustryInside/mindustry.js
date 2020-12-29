import { Constants } from '../Constants';
import { UdpSocket } from '../net/Udp';
import { ServerView, ServerData } from './ServerData';
import { Endpoint } from '../net/Endpoint';
import { Address } from '../net/Address';

export class Server implements Endpoint {
    readonly address: Address;
    readonly port: number;

    constructor(address: Address, port: number = Constants.DEFAULT_PORT) {
        this.address = address;
        this.port = port;
    }

    async updateData(): Promise<ServerData> {
        const socket = new UdpSocket(this.address, this.port);
        const buffer = await socket.send(Constants.DATA_BYTES);

        return new ServerView(buffer);
    }

    async data(): Promise<ServerData> {
        return this.updateData();
    }
}
