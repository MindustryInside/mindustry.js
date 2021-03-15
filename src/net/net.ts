import { TcpConnection } from './tcp';
import { UdpConnection } from './udp';

export abstract class NetConnection {
    protected constructor(
        protected tcp: TcpConnection = new TcpConnection(),
        protected udp: UdpConnection = new UdpConnection(),
    ) {}
}
