import { Content, ContentType } from './type/content';

export class Item extends Content {
    get contentType(): ContentType {
        return ContentType.item;
    }

    // TODO
}
