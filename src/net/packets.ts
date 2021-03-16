export abstract class Packet {
    abstract getBytes(): Buffer;

    static from(buffer: Buffer): Packet {
        return new class extends Packet {
            getBytes(): Buffer {
                return buffer;
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
