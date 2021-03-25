import { Content, ContentType } from 'content/type/content';

export class Item extends Content {
    get contentType(): ContentType {
        return ContentType.item;
    }

    // TODO
}
