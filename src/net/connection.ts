import { NetException } from './exception';

export interface NetListener {
    connected?(): void;
    disconnected?(): void;
    received?(data: Buffer): void;
}

export abstract class Connection {
    private listeners: NetListener[] = [];

    connected = false;

    abstract connect(hostname: string, port: number): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract send(data: Buffer): void;

    addListener(listener: NetListener): void {
        if (listener === null) {
            throw new TypeError('Listener cannot be null');
        }

        this.listeners.push(listener);
    }

    clearListeners(): void {
        this.listeners = [];
    }

    protected onConnect(): void {
        this.connected = true;
        this.listeners.forEach((l) => l.connected?.());
    }

    protected onDisconnect(): void {
        this.connected = false;
        this.listeners.forEach((l) => l.disconnected?.());
    }

    protected onReceive(data: Buffer): void {
        this.listeners.forEach((l) => l.received?.(data));
    }

    protected requireConnected(): void {
        if (!this.connected) {
            throw new NetException('Connection is closed');
        }
    }
}
