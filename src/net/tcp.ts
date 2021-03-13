import { Socket as Connection } from 'net';
import { NetException } from './exceptions';

export class TcpConnection {
    private connection?: Connection;
    private connected = false;

    private timeout = 2000;

    constructor() {
        this.connection = new Connection();
    }

    setTimeout(timeout: number): void {
        this.timeout = timeout;
    }

    connect(hostname: string, port: number, callback?: () => void): void {
        this.close();

        this.connection = new Connection();
        this.connection.connect(port, hostname, () => {
            this.connected = true;

            if (callback) {
                callback();
            }
        });
    }

    send(data: Buffer | string): void {
        if (!this.connected) {
            throw new NetException('Connection is closed');
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.connection!.write(data);
    }

    close(): void {
        this.connection?.destroy();
        this.connected = false;
    }
}
