export abstract class Packet {
    abstract getBytes(): Buffer;

    static from(buffer: Buffer): Packet;
    static from(str: string): Packet;
    static from(data: Buffer | string): Packet {
        return new class extends Packet {
            getBytes(): Buffer {
                return data instanceof Buffer ? data : Buffer.from(data);
            }
        }();
    }
}

export class DiscoverHost extends Packet {
    getBytes(): Buffer {
        return Buffer.of(-2, 1);
    }
}

export class Packets {
    static discoverHost = new DiscoverHost();
}
