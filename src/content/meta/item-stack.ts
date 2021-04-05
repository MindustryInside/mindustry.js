import { Item } from '../type/item';

export class ItemStack {
    constructor(
        public item: Item,
        public amount: number,
    ) {}
}
