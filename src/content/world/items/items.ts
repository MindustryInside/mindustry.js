import { ContentList } from '../../content-list';
import { Item, ItemProperties } from '../../type/item';

export const Items /* TODO :ContentList<Item> */ = {
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

    coal: new Item('coal', '#272727').init<ItemProperties>({
        explosiveness: 0.2,
        flammability: 1,
        hardness: 2,
    }),

    thorium: new Item('thorium', '#f9a3c7').init<ItemProperties>({
        explosiveness: 0.2,
        hardness: 0.4,
        radioactivity: 1,
        cost: 1.1,
    }),

    scrap: new Item('scrap', '#777777'),

    silicon: new Item('silicon', '#53565c').init<ItemProperties>({
        cost: 0.8,
    }),

    plastanium: new Item('plastanium', '#cbd97f').init<ItemProperties>({
        flammability: 0.1,
        explosiveness: 0.2,
        cost: 1.3,
    }),

    phaseFabric: new Item('phase-fabric', '#f4ba6e').init<ItemProperties>({
        cost: 1.3,
        radioactivity: 0.6,
    }),

    surgeAlloy: new Item('surge-alloy', '#f3e979').init<ItemProperties>({
        cost: 1.2,
        charge: 0.75,
    }),

    sporePod: new Item('spore-pod', '#7457ce').init<ItemProperties>({
        flammability: 1.15,
    }),

    blastCompound: new Item('blast-compound', '#ff795e').init<ItemProperties>({
        flammability: 0.4,
        explosiveness: 1.2,
    }),

    pyratite: new Item('pyratite', '#ffaa5f').init<ItemProperties>({
        flammability: 1.4,
        explosiveness: 0.4,
    }),
};
