/* eslint-disable @typescript-eslint/no-use-before-define */

import { NetException } from './exception';
import { BufferWriter } from '../../io/writer';
import { BufferReader } from '../../io/reader';

export abstract class Packet {
    protected abstract packetID: number;

    getID(): number {
        return this.packetID;
    }
}

export abstract class InternalPacket extends Packet {
    static readInternal(buffer: BufferReader): InternalPacket {
        // switch (packetID) {
        //     case 0: return new Ping();
        //     case 1: return new DiscoverHost();
        //     case 2: return new KeepAlive();
        //     case 3: return new RegisterUDP();
        //     case 4: return new RegisterTCP();
        //     default: throw new NetException(`Unknown internal packet id: ${packetID}`);
        // }
        const packetID = buffer.readByte();
        if (packetID === 0) {
            const p = new Ping();
            p.id = buffer.readInt();
            p.isReply = buffer.readByte() === 1;
            return p;
        } else if (packetID === 1) {
            return new DiscoverHost();
        } else if (packetID === 2) {
            return new KeepAlive();
        } else if (packetID === 3) {
            const p = new RegisterUDP();
            p.connectionID = buffer.readInt();
            return p;
        } else if (packetID === 4) {
            const p = new RegisterTCP();
            p.connectionID = buffer.readInt();
            return p;
        } else {
            throw new NetException(`Unknown internal packet id: ${packetID}`);
        }
    }

    static writeInternal(buffer: BufferWriter, packet: InternalPacket): void {
        buffer.writeByte(packet.packetID);
        if (packet instanceof Ping) {
            buffer.writeByte(0);
            buffer.writeInt(packet.id);
            buffer.writeByte(packet.isReply ? 1 : 0);
        }

        if (packet instanceof RegisterTCP || packet instanceof RegisterUDP) {
            buffer.writeInt(packet.connectionID);
        }
    }
}

export class Ping extends InternalPacket {
    packetID = 0;
    id!: number;
    isReply!: boolean;
}

export class DiscoverHost extends InternalPacket {
    packetID = 1;
}

export class KeepAlive extends InternalPacket {
    packetID = 2;
}

export class RegisterUDP extends InternalPacket {
    packetID = 3;
    connectionID!: number;
}

export class RegisterTCP extends InternalPacket {
    packetID = 4;
    connectionID!: number;
}
