import { BufferReader } from '../io/reader';

export const Gamemodes = ['survival', 'sandbox', 'attack', 'pvp', 'editor'];

export type Gamemode = typeof Gamemodes[number];

export type VersionType =
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

    private constructor(buffer: Buffer) {
        const reader = new BufferReader(buffer);

        this.name = reader.readString();
        this.map = reader.readString();
        this.players = reader.readInt();
        this.wave = reader.readInt();
        this.version = reader.readInt();
        this.versionType = reader.readString() as VersionType;
        this.gamemode = Gamemodes[reader.readByte()];
        this.playerLimit = reader.readInt();
        this.description = reader.readString();
    }

    static from(buffer: Buffer): ServerData {
        return new ServerView(buffer);
    }
}
