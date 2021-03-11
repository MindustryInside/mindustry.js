import { Constants } from '../Constants';
import { UdpSocket } from '../net/Udp';
import { ServerData, ServerView } from './ServerData';
import { Endpoint } from '../net/Endpoint';
import { Address } from '../net/Address';

export class Server extends Endpoint {
    static servers: Server[] = [];

    static getData(
        address: Address,
        port: number = Constants.DEFAULT_PORT,
        timeout?: number,
    ): Promise<ServerData> {
        let server = this.servers.find((s) => s.equals(Endpoint.with(address, port)));
        if (!server) {
            server = new Server(address, port);
            this.servers.push(server);
        }

        return server.data(timeout);
    }

    async data(timeout = 2000): Promise<ServerData> {
        const socket = new UdpSocket(this.address, this.port);
        socket.setTimeout(timeout);

        const buffer = await socket.send(Constants.DISCOVER_PACKET);

        return new ServerView(buffer);
    }
}
