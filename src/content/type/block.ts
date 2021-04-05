import { Content, ContentType } from '../content';
import { ItemStack } from '../meta/item-stack';

export class Block extends Content {
    get contentType(): ContentType {
        return ContentType.block;
    }

    get requirements(): ItemStack[] {
        return undefined as any; // TODO
    }
}
