import { Bytes } from './bytes';

export class BufferReader {
    private buffer: Buffer;
    private offset = 0;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
    }

    read(bytes: number): Buffer {
        this.offset += bytes;
        return this.buffer.slice(this.offset - bytes, this.offset);
    }

    readByte(): number {
        return this.read(Bytes.byte).readInt8();
    }

    readShort(): number {
        return this.read(Bytes.short).readInt16BE();
    }

    readInt(): number {
        return this.read(Bytes.int).readIntBE(0, Bytes.int);
    }

    readLong(): bigint {
        return this.read(Bytes.long).readBigInt64BE();
    }

    readFloat(): number {
        return this.read(Bytes.float).readFloatBE();
    }

    readDouble(): number {
        return this.read(Bytes.double).readDoubleBE();
    }

    readString(): string {
        return this.read(this.readByte()).toString();
    }
}
