import { Server } from './net/server';
import { Connection } from './net/core/connection';
import { Packet } from './net/core/packets';
import { AddressInfo } from 'net';
import { BufferWriter } from './io/writer';

const log = (msg: string, ...args: any[]) => console.log(`[${new Date().toLocaleString()}] ${msg}`, ...args);

log('Started');

function addressToString(address: AddressInfo): string {
    return `${address.address}:${address.port} (${address.family})`;
}

async function main(): Promise<void> {
    const server = new Server();

    server.addListener({
        connected(con: Connection) {
            log('New connection from', addressToString(con.getRemoteAddressTCP()!));
        },
        disconnected(con: Connection) {
            log('Disconnected from', con.toString());
        },
        received(con: Connection, packet: Packet) {
            log('Received from', addressToString(con.getRemoteAddressTCP()!), '-', packet);
        },
    });

    server.setDiscoveryHandler((handler) => {
        const buffer = Buffer.alloc(500);
        const writer = new BufferWriter(buffer);

        writer.writeString('Server');
        writer.writeString('Empty');
        writer.writeInt(228);
        writer.writeInt(1);
        writer.writeInt(126);
        writer.writeString('official');
        writer.writeByte(1);
        writer.writeInt(0);
        writer.writeString('\ue80f hosted on [green]node.js[]');
        writer.writeString('<3');

        handler(buffer);
    });

    await server.bind(6567, 6567);
}

void main();
