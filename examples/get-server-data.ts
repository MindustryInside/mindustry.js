import { Server, ServerData } from '../src';

async function main() {
    const server = new Server('localhost', 6567);
    const data: ServerData = await server.getData();

    console.log(data);
}

void main();
