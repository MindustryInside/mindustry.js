import { ContentList } from '../../content-list';
import { Item, ItemProperties } from '../../type/item';

export const Items: ContentList<Item> = {
    copper: new Item('copper', '#d99d73').init<ItemProperties>({
        hardness: 1,
        cost: 0.5,
        alwaysUnlocked: true,
    }),

    lead: new Item('lead', '#8c7fa9').init<ItemProperties>({
        hardness: 1,
        cost: 0.7,
        alwaysUnlocked: true,
    }),

    metaglass: new Item('metaglass', '#ebeef5').init<ItemProperties>({
        cost: 1.5,
    }),

    graphite: new Item('graphite', '#b2c6d2').init<ItemProperties>({
        cost: 1,
    }),

    sand: new Item('sand', '#f7cba4').init<ItemProperties>({
        alwaysUnlocked: true,
        lowPriority: true,
    }),

    // TODO
};
