import { Content, ContentProperties, ContentType } from '../content';
import { Stack } from '../meta/stack';
import { Item } from './item';

export interface BlockProperties extends ContentProperties {
    requirements?: Stack<Item>[];
}

export class Block extends Content<BlockProperties> implements BlockProperties {
    requirements: Stack<Item>[] = [];

    get contentType(): ContentType {
        return ContentType.block;
    }
}
