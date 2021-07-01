import { Bytes } from './bytes';

export class BufferWriter {
    private readonly buffer: Buffer;
    private offset = 0;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    writeBoolean(bool: boolean): void {
        this.buffer.writeInt8(bool ? 1 : 0, this.offset);
        this.offset += Bytes.boolean;
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

    writeString(string: string, length: number = string.length): void {
        this.buffer.writeInt8(length, this.offset);
        this.offset += Bytes.byte;

        this.buffer.write(string, this.offset);
        this.offset += length;
    }

    bytesWritten(): number {
        return this.offset;
    }
}
