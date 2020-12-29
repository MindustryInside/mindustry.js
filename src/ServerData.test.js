const { ServerData } = require('./ServerData');
const { createSocket } = require('dgram');

const exit = () => process.exit(0);

const ip = 'localhost';
const port = 6567;

const server = createSocket('udp4');

server.on('message', (buffer) => {
    const data = new ServerData(buffer);
    console.log(data);

    exit();
});

server.send(Buffer.of(-2, 1), port, ip, (error) => (error ? console.log(error) : null));
