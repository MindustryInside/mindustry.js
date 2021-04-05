import { Content } from './content';

export interface ContentList<T extends Content> {
    [key: string]: T;
}
