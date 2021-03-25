import { Block } from 'content/type/block';
import { Item } from 'content/type/item';
import { Liquid } from 'content/type/liquid';
import { Point2 } from 'util/point2';

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
    private meta: SchematicMeta;
    private tiles: SchematicTile[];

    constructor(meta: SchematicMeta, tiles: SchematicTile[]) {
        this.meta = meta;
        this.tiles = tiles;
    }

    get name(): string {
        return this.meta.name;
    }

    get description(): string {
        return this.meta.description || '';
    }

    // TODO
}
