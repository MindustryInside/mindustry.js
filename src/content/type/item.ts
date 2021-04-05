import { Content, ContentType } from '../content';

export class Item extends Content {
    color: string;

    explosiveness = 0;
    flammability = 0;
    radioactivity!: number;
    charge = 0;
    hardness = 0;
    cost = 1;
    lowPriority!: boolean;

    get contentType(): ContentType {
        return ContentType.item;
    }

    constructor(name: string, color = '#000000') {
        super(name);
        this.color = color;
    }
}
