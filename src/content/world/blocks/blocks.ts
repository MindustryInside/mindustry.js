import { Block } from '../../type/block/block';
import { ContentList } from '../../content-list';
import { BlocksEnvironment } from './environment';

class BlocksImpl extends ContentList<Block> {
    init() {
        this.add(
            new BlocksEnvironment(),
        );
    }
}

export const Blocks = new BlocksImpl();
