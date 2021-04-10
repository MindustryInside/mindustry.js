import { Block } from './block';
import { Item } from './item';
import { Liquid } from './liquid';
import { Point2 } from '../../util/point2';
import { Stack } from '../meta/stack';

export interface SchematicMeta {
    name: string;
    description?: string;
}

export type TileConfig =
    | boolean // used in door, switch block
    | Point2 // used in item bridge, mass driver
    | Point2[] // used in power node
    | Item // used in sorter, item source, unloader
    | Liquid // used in liquid source
    | Block // used in block forge
    | number // used in logic block, light block, unit factory
    | string; // used in message block

export class SchematicTile {
    constructor(
        public block: Block,
        public x: number,
        public y: number,
        public config: TileConfig,
    ) {}
}

export class Schematic {
    private tags: Map<string, string>;
    private tiles: SchematicTile[];

    // static from(data: Buffer): Schematic {
    //     return SchematicIO.read(data);
    // }

    constructor(tiles: SchematicTile[], tags: Map<string, string>) {
        this.tiles = tiles;
        this.tags = tags;
    }

    get name(): string {
        return this.tags.get('name') || '';
    }

    get description(): string {
        return this.tags.get('description') || '';
    }

    requirements(): Stack<Item>[] {
        return this.tiles.map<Stack<Item>[]>((tile) => tile.block.requirements).flat();
    }
}
