// TODO
// export class Client extends Connection implements EndPoint {
//     async connect(hostname: string, tcpPort: number, udpPort: number): Promise<void> {
//         await this.close();
//
//         if (tcpPort !== -1) {
//             this.tcp = new TcpConnection();
//             this.registerEvents(this.tcp);
//             await this.tcp.connect(hostname, tcpPort);
//         }
//
//         if (udpPort !== -1) {
//             this.udp = new UdpConnection();
//             this.registerEvents(this.udp);
//             await this.udp.connect(hostname, udpPort);
//         }
//     }
//
//     connectTCP(hostname: string, tcpPort: number): Promise<void> {
//         return this.connect(hostname, tcpPort, -1);
//     }
//
//     connectUDP(hostname: string, udpPort: number): Promise<void> {
//         return this.connect(hostname, -1, udpPort);
//     }
//
//     private registerEvents(con: UdpConnection | TcpConnection): void {
//         con.on('connect', () => this.onConnect(this));
//         con.on('close', () => this.onDisconnect(this));
//         con.on('receive', (packet) => this.onReceive(this, packet));
//     }
// }
