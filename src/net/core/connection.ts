import { AddressInfo } from 'net';
import { NetException } from 'net/core/exception';
import { Packet, Ping } from 'net/core/packets';
import { TcpConnection } from 'net/core/tcp';
import { UdpConnection } from 'net/core/udp';

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

    sendTCP(packet: Packet): Promise<void> {
        if (!this.tcp) {
            throw new NetException('Connection is closed.');
        }

        return this.tcp.send(packet);
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
