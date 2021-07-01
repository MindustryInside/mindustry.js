import { ContentList } from '../../content-list';
import { OreBlock } from '../../type/blocks/environment/ore-block';

export class BlocksOres extends ContentList<OreBlock> {
    oreCopper = new OreBlock('ore-copper');
    oreLead = new OreBlock('ore-lead');
    oreScrap = new OreBlock('ore-scrap');
    oreCoal = new OreBlock('ore-coal');
    oreTitanium = new OreBlock('ore-titanium');
    oreThorium = new OreBlock('ore-thorium');
}
