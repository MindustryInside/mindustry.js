import { BufferReader } from 'io/reader';
import { BufferWriter } from 'io/writer';

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
    modeName?: string;
}

export class ServerView {
    static write(buffer: Buffer, data: ServerData): void {
        const writer = new BufferWriter(buffer);

        writer.writeString(data.name);
        writer.writeString(data.map);
        writer.writeInt(data.players);
        writer.writeInt(data.wave);
        writer.writeInt(data.version);
        writer.writeString(data.versionType);
        writer.writeByte(Gamemodes.indexOf(data.gamemode));
        writer.writeInt(data.playerLimit);
        writer.writeString(data.description);
        if (data.modeName) {
            writer.writeString(data.modeName);
        }
    }

    static read(buffer: Buffer): ServerData {
        const reader = new BufferReader(buffer);

        const name = reader.readString();
        const map = reader.readString();
        const players = reader.readInt();
        const wave = reader.readInt();
        const version = reader.readInt();
        const versionType = reader.readString() as VersionType;
        const gamemode = Gamemodes[reader.readByte()];
        const playerLimit = reader.readInt();
        const description = reader.readString();
        const modeName = reader.readString();

        return {
            name,
            description,
            map,
            players,
            playerLimit,
            wave,
            version,
            versionType,
            gamemode,
            modeName: modeName.length > 0 ? modeName : undefined,
        };
    }
}
