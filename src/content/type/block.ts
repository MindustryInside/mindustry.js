import { Content, ContentProperties, ContentType } from '../content';
import { ItemStack } from '../meta/item-stack';

export interface BlockProperties extends ContentProperties {
    requirements: ItemStack[];
}

export class Block extends Content<BlockProperties> implements BlockProperties {
    requirements = [];

    get contentType(): ContentType {
        return ContentType.block;
    }
}
