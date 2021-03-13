import { defaultPort, discoverPacket } from '../constants';
import { UdpSocket } from '../net/udp';
import { ServerData, ServerView } from './data';
import { Host } from '../net/host';

export class Server extends Host {
    private udpSocket: UdpSocket;

    constructor(hostname: string, port = defaultPort) {
        super(hostname, port);
        this.udpSocket = new UdpSocket(this.hostname, this.port);
    }

    setTimeout(timeout: number): void {
        this.udpSocket.setTimeout(timeout);
    }

    async data(): Promise<ServerData> {
        const buffer = await this.udpSocket.send(discoverPacket);

        return new ServerView(buffer);
    }
}
