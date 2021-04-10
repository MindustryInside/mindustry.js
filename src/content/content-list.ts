import { Content } from './content';
import { Nullable } from '../util/nullable';
import { keys } from '../util/keys';

export abstract class ContentList<T extends Content> {
    all(): T[] {
        return keys(this).map((item) => this[item]) as unknown as T[];
    }

    getByName(name: string): Nullable<T> {
        return this.all().find((c) => c.name === name);
    }
}
