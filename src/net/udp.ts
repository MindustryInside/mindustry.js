import { createSocket, Socket } from 'dgram';
import * as util from 'util';
import { NOTFOUND } from 'dns';
import { Host } from './host';
import { HostUnavailableError } from './errors';
import Timeout = NodeJS.Timeout;

/* eslint-disable no-underscore-dangle */
export class UdpSocket {
    private host: Host;
    private socket: Socket;

    private timeout = 2000;
    private timer?: Timeout;

    constructor(hostname: string, port: number) {
        this.host = new Host(hostname, port);
        this.socket = createSocket('udp4');
    }

    bind(host: Host): void {
        this.host = host;
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
                err.message.includes(NOTFOUND) ? new HostUnavailableError(this.host) : err,
                Buffer.of(),
            );
        });

        this.socket.once('message', (buffer) => {
            this.clearTimeout();
            callback(null, buffer);
        });

        this.runTimeout(callback);
        this.socket.send(data, this.host.port, this.host.hostname);
    }

    private runTimeout(callback: (err: Error) => void): void {
       this.timer = setTimeout(() => {
            callback(new HostUnavailableError(this.host));
       }, this.timeout);
    }

    private clearTimeout(): void {
        clearTimeout(this.timeout);
    }
}
