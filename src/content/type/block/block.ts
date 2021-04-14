import { Content, ContentProperties, ContentType } from '../../content';
import { Stack } from '../../meta/stack';
import { Item } from '../item';

export interface BlockProperties extends ContentProperties {
    requirements?: Stack<Item>[];
    size?: number;
}

export class Block extends Content<BlockProperties> implements BlockProperties {
    requirements: Stack<Item>[] = [];
    size = 1;

    get contentType(): ContentType {
        return ContentType.block;
    }
}
