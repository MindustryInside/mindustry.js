import { createSocket, Socket as DatagramChannel } from 'dgram';
import { Connection } from './connection';
import { Packet } from './packets';

export class UdpConnection extends Connection {
    private datagramChannel?: DatagramChannel;

    connect(hostname: string, port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            void this.disconnect();

            this.datagramChannel = createSocket('udp4');
            this.datagramChannel.on('error', reject);
            this.datagramChannel.on('message', (data: Buffer) => this.emit('receive', data));
            this.datagramChannel.connect(port, hostname, () => {
                this.emit('connect');
                resolve();
            });
        });
    }

    send(packet: Packet): Promise<void> {
        return new Promise((resolve) => {
            this.requireConnected();

            this.datagramChannel!.send(packet.getBytes(), () => resolve());
        });
    }

    disconnect(): Promise<void> {
        return new Promise((resolve) => {
            this.datagramChannel?.close(() => {
                this.emit('disconnect');
                resolve();
            });
        });
    }
}
