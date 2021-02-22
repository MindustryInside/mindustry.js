import { createSocket, Socket } from 'dgram';
import { Endpoint } from './Endpoint';
import { Address } from './Address';

export class UdpSocket implements Endpoint {
    readonly address: Address;
    readonly port: number;
    private socket: Socket;

    constructor(address: Address, port: number) {
        this.socket = createSocket('udp4');
        this.address = address;
        this.port = port;
    }

    send(data: string | Uint8Array): Promise<Buffer> {
        return new Promise((resolve, reject) => {
			const timeout = setTimeout(reject, 1000);
			
			this.socket.once('error', reject);
            this.socket.once('message', (buffer) => {
				clearTimeout(timeout);
				resolve(buffer);
			});
			
            this.socket.send(data, this.port, this.address);
        });
    }
}
