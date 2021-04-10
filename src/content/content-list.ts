import { Content } from './content';
import { Nullable } from '../util/types/nullable';
import { keys } from '../util/keys';

export abstract class ContentList<T extends Content<T>> {
    all(): T[] {
        return keys(this).map((item) => this[item]) as unknown as T[];
    }

    getByName(name: string): Nullable<T> {
        return this.all().find((c) => c.name === name);
    }
}
