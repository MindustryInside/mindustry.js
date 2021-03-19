import { Bytes } from './bytes';

export class BufferWriter {
    private buffer: Buffer;
    private offset = 0;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    writeByte(byte: number): void {
        this.buffer.writeInt8(byte, this.offset);
        this.offset += Bytes.byte;
    }

    writeShort(short: number): void {
        this.buffer.writeInt16BE(short, this.offset);
        this.offset += Bytes.short;
    }

    writeInt(int: number): void {
        this.buffer.writeIntBE(int, this.offset, Bytes.int);
        this.offset += Bytes.int;
    }

    writeLong(long: bigint): void {
        this.buffer.writeBigInt64BE(long, this.offset);
        this.offset += Bytes.long;
    }

    writeFloat(float: number): void {
        this.buffer.writeFloatBE(float, this.offset);
        this.offset += Bytes.float;
    }

    writeDouble(double: number): void {
        this.buffer.writeDoubleBE(double, this.offset);
        this.offset += Bytes.double;
    }

    writeString(string: string): void {
        this.buffer.writeInt8(string.length, this.offset);
        this.offset += Bytes.byte;

        this.buffer.write(string, this.offset);
        this.offset += string.length;
    }
}
