import { Content, ContentType } from './type/content';

export class Block extends Content {
    get contentType(): ContentType {
        return ContentType.block;
    }

    // TODO
}
