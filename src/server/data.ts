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

    constructor(buffer: Buffer) {
        const reader = new BufferReader(buffer);

        this.name = reader.str();
        this.map = reader.str();
        this.players = reader.int();
        this.wave = reader.int();
        this.version = reader.int();
        this.versionType = reader.str() as VersionType;
        this.gamemode = Gamemodes[reader.byte()];
        this.playerLimit = reader.int();
        this.description = reader.str();
    }
}
