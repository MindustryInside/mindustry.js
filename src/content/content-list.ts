import { Content } from './content';
import { Nullable } from '../util/types/nullable';
import { properties } from '../util/functions';

export abstract class ContentList<T extends Content<T>> {
    init(): void {}

    constructor() {
        this.init();
    }

    add(...lists: ContentList<T>[]): void {
        lists.forEach((list) => {
            Object.defineProperties(this, Object.getOwnPropertyDescriptors(list));
        });
    }

    all(): T[] {
        return properties(this).map((item) => this[item]) as unknown as T[];
    }

    getByName(name: string): Nullable<T> {
        return this.all().find((c) => c.name === name);
    }
}
