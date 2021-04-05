import { AddressInfo } from 'net';
import { ServerView } from 'net/server-data';
import { Server } from 'net/server';
import { Connection } from 'net/core/connection';
import { Packet } from 'net/core/packets';

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

        ServerView.write(buffer, {
            name: 'Server',
            description: '\ue80f hosted on [green]node.js[]',
            map: 'Empty',
            players: 228,
            playerLimit: 0,
            wave: 1337,
            version: 126,
            versionType: 'official',
            gamemode: 'sandbox',
            modeName: '<3',
        });

        handler(buffer);
    });

    await server.bind(6567, 6567);
}

void main();
