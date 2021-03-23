import { Packet } from 'net/core/packets';

export interface Agent {
    connect(hostname: string, port: number): Promise<void>
    send(packet: Packet): Promise<void>
    close(): Promise<void>
}
