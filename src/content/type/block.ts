import { Content, ContentType } from 'content/type/content';

export class Block extends Content {
    get contentType(): ContentType {
        return ContentType.block;
    }

    // TODO
}
