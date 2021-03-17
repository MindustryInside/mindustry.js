import { Socket as SocketChannel } from 'net';
import { Connection } from './connection';
import { Packet } from './packets';

export class TcpConnection extends Connection {
    private socketChannel?: SocketChannel;

    connect(hostname: string, port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            void this.disconnect();

            this.socketChannel = new SocketChannel();
            this.socketChannel.on('error', reject);
            this.socketChannel.on('data', (data: Buffer) => this.emit('receive', data));
            this.socketChannel.connect(port, hostname, () => {
                this.emit('connect');
                resolve();
            });
        });
    }

    send(packet: Packet): Promise<void> {
        return new Promise((resolve) => {
            this.requireConnected();

            this.socketChannel!.write(packet.getBytes(), (err) => {
                if (err) throw err;
                resolve();
            });
        });
    }

    disconnect(): Promise<void> {
        return new Promise((resolve) => {
            this.socketChannel?.end(() => {
                this.emit('disconnect');
                resolve();
            });
        });
    }
}
