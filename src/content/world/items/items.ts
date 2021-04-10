import { Item } from '../../type/item';
import { ContentList } from '../../content-list';

class ItemsImpl extends ContentList<Item> {
    copper = new Item('copper', '#d99d73', {
        hardness: 1,
        cost: 0.5,
        alwaysUnlocked: true,
    });

    lead = new Item('lead', '#8c7fa9', {
        hardness: 1,
        cost: 0.7,
        alwaysUnlocked: true,
    });

    metaglass = new Item('metaglass', '#ebeef5', {
        cost: 1.5,
    });

    graphite = new Item('graphite', '#b2c6d2', {
        cost: 1,
    });

    sand = new Item('sand', '#f7cba4', {
        alwaysUnlocked: true,
        lowPriority: true,
    });

    coal = new Item('coal', '#272727', {
        explosiveness: 0.2,
        flammability: 1,
        hardness: 2,
    });

    thorium = new Item('thorium', '#f9a3c7', {
        explosiveness: 0.2,
        hardness: 0.4,
        radioactivity: 1,
        cost: 1.1,
    });

    scrap = new Item('scrap', '#777777');

    silicon = new Item('silicon', '#53565c', {
        cost: 0.8,
    });

    plastanium = new Item('plastanium', '#cbd97f', {
        flammability: 0.1,
        explosiveness: 0.2,
        cost: 1.3,
    });

    phaseFabric = new Item('phase-fabric', '#f4ba6e', {
        cost: 1.3,
        radioactivity: 0.6,
    });

    surgeAlloy = new Item('surge-alloy', '#f3e979', {
        cost: 1.2,
        charge: 0.75,
    });

    sporePod = new Item('spore-pod', '#7457ce', {
        flammability: 1.15,
    });

    blastCompound = new Item('blast-compound', '#ff795e', {
        flammability: 0.4,
        explosiveness: 1.2,
    });

    pyratite = new Item('pyratite', '#ffaa5f', {
        flammability: 1.4,
        explosiveness: 0.4,
    });
}

export const Items = new ItemsImpl();
