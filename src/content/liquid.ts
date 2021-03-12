import { Content, ContentType } from './type/content';

export class Liquid extends Content {
    get contentType(): ContentType {
        return ContentType.liquid;
    }

    // TODO
}
