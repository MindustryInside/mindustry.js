import { RemoteInfo } from 'dgram';
import { Server as ServerSocketChannel, Socket as SocketChannel } from 'net';
import { BufferReader } from '../io/reader';
import { Connection, EndPoint, NetListener } from './core/connection';
import { DiscoverHost, Packet, RegisterTCP, RegisterUDP } from './core/packets';
import { Serializer } from './core/serializer';
import { TcpConnection } from './core/tcp';
import { UdpConnection } from './core/udp';

export interface DiscoveryHandler {
    (handler: (buffer: Buffer) => void): void;
}

export class NetServer implements EndPoint {
    protected listeners: NetListener[] = [];
    private connections: Connection[] = [];
    private pendingConnections: Map<number, Connection> = new Map<number, Connection>();
    private serverSocketChannel?: ServerSocketChannel;
    private udp?: UdpConnection;
    private discoveryHandler: DiscoveryHandler = () => {};
    private nextConnectionID = 0;
    private serverListener: NetListener;

    constructor() {
        const self = this;

        this.serverListener = {
            connected(con: Connection) {
                self.onConnect(con);
            },

            disconnected(con: Connection) {
                self.removeConnection(con);
                self.onDisconnect(con);
            },

            received(con: Connection, packet: Packet) {
                self.onReceive(con, packet);
            },
        };
    }

    setDiscoveryHandler(handler: DiscoveryHandler): void {
        this.discoveryHandler = handler;
    }

    async bind(tcpPort: number, udpPort: number): Promise<void> {
        if (tcpPort !== -1) {
            await new Promise<void>((resolve, reject) => {
                this.serverSocketChannel = new ServerSocketChannel();
                this.serverSocketChannel.on('error', reject);
                this.serverSocketChannel.on('connection', (con) => this.acceptConnection(con));
                this.serverSocketChannel.listen(tcpPort, resolve);
            });
        }

        if (udpPort !== -1) {
            this.udp = new UdpConnection();
            this.udp.on('receive', (packet: Packet, remote: RemoteInfo) => {
                if (packet instanceof RegisterUDP) {
                    const con = this.pendingConnections.get(packet.connectionID);
                    if (con) {
                        this.addConnection(con);
                        void con.sendTCP(new RegisterUDP()).then(() => con.onConnect(con));
                    }
                }

                if (packet instanceof DiscoverHost) {
                    this.discoveryHandler((buffer: Buffer) => {
                        void this.udp!.sendBuffer(buffer, remote.port, remote.address);
                    });
                }
            });

            await this.udp.bind(udpPort);
        }
    }

    private acceptConnection(socketChannel: SocketChannel): void {
        const connection = new Connection();
        if (this.udp) {
            connection.udp = this.udp;
        }
        connection.tcp = new TcpConnection(socketChannel);
        connection.endPoint = this;
        connection.id = ++this.nextConnectionID;
        connection.addListener(this.serverListener);

        if (this.udp) {
            this.pendingConnections.set(connection.id, connection);
        } else {
            this.addConnection(connection);
        }

        socketChannel.on('data', (buffer) => {
            const reader = new BufferReader(buffer);
            const packet = Serializer.read(reader);
            connection.onReceive(connection, packet);
        });
        socketChannel.on('close', () => void connection.close());
        socketChannel.on('error', () => void connection.close());

        const register = new RegisterTCP();
        register.connectionID = connection.id;

        void connection.sendTCP(register).then(() => connection.onConnect(connection));
    }

    async sendToTCP(id: number, packet: Packet): Promise<void> {
        await Promise.all(this.connections.map((con) => {
            if (con.id === id) {
                return con.sendTCP(packet);
            }

            return Promise.resolve();
        }));
    }

    async sendToUDP(id: number, packet: Packet): Promise<void> {
        await Promise.all(this.connections.map((con) => {
            if (con.id === id) {
                return con.sendUDP(packet);
            }

            return Promise.resolve();
        }));
    }

    async sendToAllTCP(packet: Packet): Promise<void> {
        await Promise.all(this.connections.map((con) => con.sendTCP(packet)));
    }

    async sendToAllUDP(packet: Packet): Promise<void> {
        await Promise.all(this.connections.map((con) => con.sendUDP(packet)));
    }

    addConnection(con: Connection): void {
        this.connections.push(con);
    }

    removeConnection(con: Connection): void {
        const index = this.connections.indexOf(con);
        if (index !== -1) {
            this.connections.splice(index, 1);
        }
    }

    async close(): Promise<void> {
        await Promise.all(this.connections.map((con) => con.close()));
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
        this.listeners.forEach((l) => l.received?.(con, packet));
    }
}
