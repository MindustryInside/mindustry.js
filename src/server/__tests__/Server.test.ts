import { Server } from '../Server';
import { ServerData } from '../ServerData';

async function main() {
    const server: Server = new Server('localhost');
    const data: ServerData = await server.data();

    console.log(data.gamemode);
}

void main();
