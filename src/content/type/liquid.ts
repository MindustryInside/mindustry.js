import { Content, ContentType } from '../content';

export class Liquid extends Content {
    get contentType(): ContentType {
        return ContentType.liquid;
    }

    // TODO
}
