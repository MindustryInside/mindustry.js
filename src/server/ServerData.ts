const Gamemodes = ['survival', 'sandbox', 'attack', 'pvp', 'editor'] as const;

export type Gamemode = typeof Gamemodes[number];

type VersionType =
    | 'official'
    | 'custom'
    | 'bleeding edge';

export interface ServerData {
    name: string;
    description: string;
    map: string;
    players: number;
    playerLimit: number;
    wave: number;
    version: number;
    versionType: VersionType;
    gamemode: Gamemode;
}

export class ServerView implements ServerData {
    name: string;
    description: string;
    map: string;
    players: number;
    playerLimit: number;
    wave: number;
    version: number;
    versionType: VersionType;
    gamemode: Gamemode;

    private buffer: Buffer;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
        this.name = this.readString();
        this.map = this.readString();
        this.players = this.readInt();
        this.wave = this.readInt();
        this.version = this.readInt();
        this.versionType = this.readString() as VersionType;
        this.gamemode = Gamemodes[this.read(4)];
        this.playerLimit = this.read(1);
        this.description = this.readString();

        delete this.buffer;
    }

    private readString() {
        const str = this.buffer.slice(1, this.buffer[0] + 1).toString();
        this.buffer = this.buffer.slice(this.buffer[0] + 1);

        return str;
    }

    private readInt() {
        const int = this.buffer.readInt8(3);
        this.buffer = this.buffer.slice(4);

        return int;
    }

    private read(increment: number) {
        const byte = this.buffer.readInt8();
        this.buffer = this.buffer.slice(increment);

        return byte;
    }
}
