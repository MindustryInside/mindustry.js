import { EventEmitter } from 'events';
import { AddressInfo, Socket as SocketChannel } from 'net';
import { Packet } from './packets';
import { NetException } from './exception';
import { Serializer } from './serializer';
import { BufferReader } from '../../io/reader';
import { BufferWriter } from '../../io/writer';
import { Agent } from './agent';

export class TcpConnection extends EventEmitter implements Agent {
    private socketChannel?: SocketChannel;

    constructor(socketChannel?: SocketChannel) {
        super();

        this.socketChannel = socketChannel;
    }

    async connect(hostname: string, port: number): Promise<void> {
        await this.close();
        await new Promise<void>((resolve, reject) => {
            this.socketChannel = new SocketChannel();
            this.socketChannel.on('error', reject);
            this.socketChannel.on('data', (buffer) => {
                const reader = new BufferReader(buffer);
                const packet = Serializer.read(reader);

                this.emit('receive', packet);
            });
            this.socketChannel.connect(port, hostname, () => {
                this.emit('connect');
                resolve();
            });
        });
    }

    send(packet: Packet): Promise<void> {
        return new Promise((resolve) => {
            if (!this.socketChannel) {
                throw new NetException('Connection is closed');
            }

            const writeBuffer = Buffer.alloc(8);
            const writer = new BufferWriter(writeBuffer);
            Serializer.write(writer, packet);
            this.socketChannel.write(writeBuffer, (err) => {
                if (err) throw err;
                resolve();
            });
        });
    }

    close(): Promise<void> {
        return new Promise((resolve) => {
            if (!this.socketChannel) {
                resolve()
            }

            this.socketChannel!.end(() => {
                this.emit('close');
                resolve();
            });

            this.socketChannel = undefined;
        });
    }

    remoteAddress(): AddressInfo | undefined {
        return {
            address: this.socketChannel?.remoteAddress!,
            port: this.socketChannel?.remotePort!,
            family: this.socketChannel?.remoteFamily!
        };
    }
}
