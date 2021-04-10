import { Content, ContentProperties, ContentType } from '../content';

export interface ItemProperties extends ContentProperties {
    color?: string;
    explosiveness?: number;
    flammability?: number;
    radioactivity?: number;
    charge?: number;
    hardness?: number;
    cost?: number;
    lowPriority?: boolean;
}

export class Item extends Content<ItemProperties> implements ItemProperties {
    color: string;

    explosiveness = 0;
    flammability = 0;
    radioactivity!: number;
    charge = 0;
    hardness = 0;
    cost = 1;
    lowPriority!: boolean;

    constructor(name: string, color = '#000000', constructor?: ItemProperties) {
        super(name, constructor);
        this.color = color;
    }

    get contentType(): ContentType {
        return ContentType.item;
    }
}
