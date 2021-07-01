import { EventEmitter } from 'events';
import { Packet } from './packets';

export interface Agent extends EventEmitter {
    connect(hostname: string, port: number): Promise<void>
    send(packet: Packet): Promise<void>
    close(): Promise<void>
}
