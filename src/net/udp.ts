import { createSocket, Socket } from 'dgram';
import * as util from 'util';
import { NOTFOUND } from 'dns';
import { Host } from './host';
import { HostUnavailableException } from './exceptions';
import Timeout = NodeJS.Timeout;

/* eslint-disable no-underscore-dangle */
export class UdpSocket {
    private host: Host;
    private socket: Socket;

    private timeout = 2000;

    constructor(hostname: string, port: number) {
        this.host = new Host(hostname, port);
        this.socket = createSocket('udp4');
    }

    setTimeout(timeout: number): void {
        this.timeout = timeout;
    }

    async send(data: Buffer): Promise<Buffer> {
        const send = util.promisify(this._send.bind(this));
        const buffer = await send(data) as Buffer;

        return buffer;
    }

    private _send(data: Buffer, callback: (err: Error | null, buffer?: Buffer) => void): void {
        this.socket.once('error', (err) => {
            callback(
                err.message.includes(NOTFOUND) ? new HostUnavailableException(this.host) : err,
                Buffer.of(),
            );
        });

        const timer = this.runTimeout(callback);

        this.socket.once('message', (buffer) => {
            clearTimeout(timer);
            callback(null, buffer);
        });

        this.socket.send(data, this.host.port, this.host.hostname);
    }

    private runTimeout(callback: (err: Error) => void): Timeout {
       return setTimeout(() => {
            callback(new HostUnavailableException(this.host));
       }, this.timeout);
    }
}
