import { Block } from '../../type/block';
import { ContentList } from '../../content-list';

class BlocksImpl extends ContentList<Block> {}

export const Blocks = new BlocksImpl();
