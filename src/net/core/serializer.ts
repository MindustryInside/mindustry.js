import { BufferReader } from '../../io/reader';
import { BufferWriter } from '../../io/writer';
import { InternalPacket, Packet } from './packets';

export class Serializer {
    static write(buffer: BufferWriter, packet: Packet): void {
        // size
        // buffer.writeShort(6); todo: refactor this

        if (packet instanceof InternalPacket) {
            buffer.writeByte(-2);
            InternalPacket.writeInternal(buffer, packet);
        } else {
            buffer.writeByte(packet.getID());
        }
    }

    static read(buffer: BufferReader): Packet {
        const id = buffer.readByte();
        if (id === -2) {
            return InternalPacket.readInternal(buffer);
        }

        // eslint-disable-next-line new-parens
        return new class extends Packet {
            packetID = id;
            data = buffer.getBuffer();
        };
    }
}
