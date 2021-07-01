import { AddressInfo } from 'net';
import { NetException } from './exception';
import { Packet, Ping } from './packets';
import { TcpConnection } from './tcp';
import { UdpConnection } from './udp';
import { Agent } from './agent';

export interface NetListener {
    connected?(con: Connection): void
    disconnected?(con: Connection): void
    received?(con: Connection, packet: Packet): void
}

export interface EndPoint {
    addListener(listener: NetListener): void
    removeListener(listener: NetListener): void

    onConnect(con: Connection): void
    onDisconnect(con: Connection): void
    onReceive(con: Connection, packet: Packet): void

    close(): Promise<void>
}

export class Connection implements EndPoint {
    private listeners: NetListener[] = [];
    id = -1;
    name?: string;
    endPoint!: EndPoint;

    tcp?: TcpConnection;
    udp?: UdpConnection;

    connectTCP(hostname: string, port: number): Promise<void> {
        if (!this.tcp) {
            this.tcp = new TcpConnection();
            this.handleEvents(this.tcp);
        }

        return this.tcp.connect(hostname, port);
    }

    sendTCP(packet: Packet): Promise<void> {
        if (!this.tcp) {
            throw new NetException('Connection is closed.');
        }

        return this.tcp.send(packet);
    }

    connectUDP(hostname: string, port: number): Promise<void> {
        if (!this.udp) {
            this.udp = new UdpConnection();
            this.handleEvents(this.udp);
        }

        return this.udp.connect(hostname, port);
    }

    sendUDP(packet: Packet): Promise<void> {
        if (!this.udp) {
            throw new NetException('Connection is closed.');
        }

        return this.udp.send(packet);
    }

    async close(): Promise<void> {
        if (this.tcp) {
            await this.tcp.close();
        }

        if (this.udp) {
            await this.udp.close();
        }

        this.onDisconnect(this);
    }

    addListener(listener: NetListener): void {
        this.listeners.push(listener);
    }

    removeListener(listener: NetListener): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    onConnect(con: Connection): void {
        this.listeners.forEach((l) => l.connected?.(con));
    }

    onDisconnect(con: Connection): void {
        this.listeners.forEach((l) => l.disconnected?.(con));
    }

    onReceive(con: Connection, packet: Packet): void {
        if (packet instanceof Ping) {
            // TODO
        }

        this.listeners.forEach((l) => l.received?.(con, packet));
    }

    private handleEvents(agent: Agent) {
        agent.on('connect', () => this.onConnect(this));
        agent.on('receive', (packet, remote) => this.onReceive(this, packet));
        agent.on('close', () => this.onDisconnect(this));
    }

    getRemoteAddressTCP(): AddressInfo | undefined {
        return this.tcp?.remoteAddress();
    }

    getRemoteAddressUDP(): AddressInfo | undefined {
        return this.udp?.address();
    }

    toString(): string {
        return this.name ? this.name : `Connection#${this.id}`;
    }
}
