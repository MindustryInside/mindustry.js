import { DEFAULT_PORT, DISCOVER_PACKET } from '../constants';
import { UdpSocket } from '../net/udp';
import { ServerData, ServerView } from './data';
import { Endpoint } from '../net/endpoint';
import { Address } from '../net/address';

export class Server extends Endpoint {
    static servers: Server[] = [];

    static getData(
        address: Address,
        port: number = DEFAULT_PORT,
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

        const buffer = await socket.send(DISCOVER_PACKET);

        return new ServerView(buffer);
    }
}
