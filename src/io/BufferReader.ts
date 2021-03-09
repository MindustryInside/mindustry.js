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

    byte(): number {
        return this.read(1).readInt8();
    }

    short(): number {
        return this.read(2).readInt16BE();
    }

    int(): number {
        return this.read(4).readIntBE(0, 4);
    }

    long(): bigint {
        return this.read(8).readBigInt64BE();
    }

    float(): number {
        return this.read(4).readFloatBE();
    }

    double(): number {
        return this.read(8).readDoubleBE();
    }

    str(): string {
        return this.read(this.byte()).toString();
    }
}
