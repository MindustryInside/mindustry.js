import { EventEmitter } from 'events';
import { NetException } from './exception';
import { Packet } from './packets';

export interface NetListener {
    connected?(): void;
    disconnected?(): void;
    received?(data: Buffer): void;
}

export interface Connection {
    on(event: 'connect', listener: () => void): this;
    on(event: 'disconnect', listener: () => void): this;
    on(event: 'receive', listener: (data: Buffer) => void): this;

    once(event: 'connect', listener: () => void): this;
    once(event: 'disconnect', listener: () => void): this;
    once(event: 'receive', listener: (data: Buffer) => void): this;

    emit(event: 'connect'): boolean;
    emit(event: 'disconnect'): boolean;
    emit(event: 'receive', data: Buffer): boolean;
}

export abstract class Connection extends EventEmitter {
    connected = false;

    abstract connect(hostname: string, port: number): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract send(packet: Packet): void;

    constructor() {
        super();

        this.on('connect', () => {
            this.connected = true;
        });

        this.on('disconnect', () => {
            this.connected = false;
        });
    }

    awaitMessage(): Promise<Buffer> {
        return new Promise((resolve) => {
            this.once('receive', resolve);
        });
    }

    protected requireConnected(): void {
        if (!this.connected) {
            throw new NetException('Connection is closed');
        }
    }
}
