import { Constants } from '../Constants';
import { UdpSocket } from '../net/Udp';
import { ServerView, ServerData } from './ServerData';
import { Endpoint } from '../net/Endpoint';
import { Address } from '../net/Address';

export class Server implements Endpoint {
    readonly address: Address;
    readonly port: number;
    private serverData: ServerData;

    constructor(address: Address, port: number = Constants.DEFAULT_PORT) {
        this.address = address;
        this.port = port;
    }

    async updateData(): Promise<void> {
        const socket = new UdpSocket(this.address, this.port);
        const buffer = await socket.send(Constants.DATA_BYTES);

        this.serverData = new ServerView(buffer);
    }

    async data(): Promise<ServerData> {
        await this.updateData();
        return this.serverData;
    }
}
