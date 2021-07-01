import { createSocket, Socket as DatagramChannel } from 'dgram';
import { EventEmitter } from 'events';
import { AddressInfo } from 'net';
import { BufferReader } from '../../io/reader';
import { BufferWriter } from '../../io/writer';
import { Agent } from './agent';
import { NetException } from './exception';
import { Packet } from './packets';
import { Serializer } from './serializer';

export class UdpConnection extends EventEmitter implements Agent {
    private datagramChannel?: DatagramChannel;
    private udpRemoteAddress?: AddressInfo;

    constructor(datagramChannel?: DatagramChannel) {
        super();

        this.datagramChannel = datagramChannel;
    }

    async connect(hostname: string, port: number): Promise<void> {
        await this.close();
        await new Promise<void>((resolve, reject) => {
            this.datagramChannel = this.createChannel(reject);
            this.datagramChannel.connect(port, hostname, () => {
                this.emit('connect');
                resolve();
            });
        });
    }

    async bind(port: number): Promise<void> {
        await this.close();
        await new Promise<void>((resolve, reject) => {
            this.datagramChannel = this.createChannel(reject);
            this.datagramChannel.bind(port, resolve);
        });
    }

    private createChannel(callback: (err: Error) => void): DatagramChannel {
        const channel = createSocket('udp4');
        channel.on('error', callback);
        channel.on('message', (buffer, remote) => {
            const reader = new BufferReader(buffer);
            const packet = Serializer.read(reader);

            this.udpRemoteAddress = remote;
            this.emit('receive', packet, remote);
        });

        return channel;
    }

    send(packet: Packet): Promise<void> {
        return new Promise((resolve) => {
            if (!this.datagramChannel) {
                throw new NetException('Connection is closed');
            }

            const writeBuffer = Buffer.alloc(8192);
            const writer = new BufferWriter(writeBuffer);
            Serializer.write(writer, packet);
            this.datagramChannel.send(writeBuffer.slice(0, writer.bytesWritten()), (err) => {
                if (err) throw err;
                resolve();
            });
        });
    }

    sendBuffer(buffer: Buffer, port: number, address: string): Promise<void> {
        return new Promise((resolve) => {
            if (!this.datagramChannel) {
                throw new NetException('Connection is closed');
            }

            this.datagramChannel.send(buffer, port, address, (err) => {
                if (err) throw err;
                resolve();
            });
        });
    }

    close(): Promise<void> {
        return new Promise((resolve) => {
            if (!this.datagramChannel) {
                resolve();
            }

            this.datagramChannel!.close(() => {
                this.emit('close');
                resolve();
            });

            this.datagramChannel = undefined;
        });
    }

    address(): AddressInfo | undefined {
        return this.udpRemoteAddress;
    }
}
