const Gamemodes = ['survival', 'sandbox', 'attack', 'pvp', 'editor'];

class ServerData {
    /**
     * @param {Buffer} bytes
     */
    constructor(bytes) {
        this.bytes = bytes;
        this.name = this.readString();
        this.map = this.readString();
        this.players = this.readInt();
        this.wave = this.readInt();
        this.version = this.readInt();
        this.vertype = this.readString();
        this.gamemode = Gamemodes[this.read(4)];
        this.playerLimit = this.read(1);
        this.desc = this.readString();

        delete this.bytes;
    }

    readString() {
        const str = this.bytes.slice(1, this.bytes[0] + 1).toString();
        this.bytes = this.bytes.slice(this.bytes[0] + 1);

        return str;
    }

    readInt() {
        const int = this.bytes.readInt8(3);
        this.bytes = this.bytes.slice(4);

        return int;
    }

    read(increment) {
        const byte = this.bytes.readInt8();
        this.bytes = this.bytes.slice(increment);

        return byte;
    }
}

module.exports = { ServerData };
