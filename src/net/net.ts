import { TcpConnection } from './tcp';
import { UdpConnection } from './udp';
import { Packet } from './packets';

export enum SendMode {
    tcp, udp
}

export abstract class NetConnection {
    protected constructor(
        private tcp: TcpConnection = new TcpConnection(),
        private udp: UdpConnection = new UdpConnection(),
    ) {}

    protected async connect(hostname: string, port: number, mode: SendMode): Promise<void> {
        if (mode === SendMode.tcp) {
            await this.tcp.connect(hostname, port);
        }

        await this.udp.connect(hostname, port);
    }

    protected async disconnect(mode: SendMode): Promise<void> {
        if (mode === SendMode.tcp) {
            await this.tcp.disconnect();
        }

        await this.udp.disconnect();
    }

    protected async send(packet: Packet, mode: SendMode): Promise<void> {
        if (mode === SendMode.tcp) {
            await this.tcp.send(packet);
        }

        await this.udp.send(packet);
    }

    protected async awaitMessage(mode: SendMode): Promise<Buffer> {
        if (mode === SendMode.tcp) {
            return this.tcp.awaitMessage();
        }

        return this.udp.awaitMessage();
    }
}
