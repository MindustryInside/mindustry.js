import { Block } from '../../type/block';
import { ContentList } from '../../content-list';
import { BlocksEnvironment } from './environment';
import { BlocksOres } from './ores';
import { BlocksCrafting } from './crafting';

class BlocksImpl extends ContentList<Block> {
    init() {
        this.add(
            new BlocksEnvironment(),
            new BlocksOres(),
            new BlocksCrafting(),
            /* TODO:
                defense,
                distribution,
                transport blocks,
                liquid,
                power,
                production,
                storage,
                turrets,
                units,
                payloads,
                sandbox,
                legacy (?),
                campaign,
                logic */
        );
    }
}

export const Blocks = new BlocksImpl();
