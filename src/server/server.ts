import { DEFAULT_PORT, DISCOVER_PACKET } from '../constants';
import { UdpSocket } from '../net/udp';
import { ServerData, ServerView } from './data';
import { Host } from '../net/host';

export class Server extends Host {
    constructor(hostname: string, port = DEFAULT_PORT) {
        super(hostname, port);
    }

    async data(timeout = 2000): Promise<ServerData> {
        const socket = new UdpSocket(this.hostname, this.port);
        socket.setTimeout(timeout);

        const buffer = await socket.send(DISCOVER_PACKET);

        return new ServerView(buffer);
    }
}
