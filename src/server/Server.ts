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

    updateData(): Promise<ServerData> {
        return new Promise((resolve, reject) => {
            const socket = new UdpSocket(this.address, this.port);

            socket.send(Constants.DISCOVER_PACKET)
                .then((buffer) => {
                    resolve(new ServerView(buffer));
                })
                .catch(() => {
                    reject(new Error('Server is offline!'));
                });
        });
    }

    data(): Promise<ServerData> {
        return this.updateData();
    }
}
