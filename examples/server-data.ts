import { Server, ServerData } from '../src';

async function main() {
    const data: ServerData = await new Server('mindurka.tk', 6567).getData();
    console.log(data);
}

void main();
