import { BufferReader } from './reader';
import { BufferWriter } from './writer';

describe('Buffer IO', () => {
    it('reads / writes to buffer', () => {
        const buffer = Buffer.alloc(1024);

        const writer = new BufferWriter(buffer);
        writer.writeByte(127);
        writer.writeShort(32767);
        writer.writeInt(2 ** 31 - 1);
        writer.writeLong(2n ** 63n - 1n);
        writer.writeFloat(0x7f7fffff);
        writer.writeDouble(0x7fefffffffffffff);
        writer.writeString('foo');

        const reader = new BufferReader(buffer);
        expect(reader.readByte()).toBe(127);
        expect(reader.readShort()).toBe(32767);
        expect(reader.readInt()).toBe(2 ** 31 - 1);
        expect(reader.readLong()).toBe(2n ** 63n - 1n);
        expect(reader.readFloat()).toBe(0x7f7fffff + 1);
        expect(reader.readDouble()).toBe(0x7fefffffffffffff);
        expect(reader.readString()).toBe('foo');
    });
});
