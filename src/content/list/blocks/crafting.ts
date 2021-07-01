import { ContentList } from '../../content-list';
import { Block } from '../../type/block';
import { GenericCrafter } from '../../type/blocks/production/generic-crafter';
import { Stack } from '../../meta/stack';
import { Items } from '../items/items';
import { AttributeCrafter } from '../../type/blocks/production/attribute-crafter';
import { LiquidConverter } from '../../type/blocks/production/liquid-converter';
import { Separator } from '../../type/blocks/production/separator';
import { Incinerator } from '../../type/blocks/production/incinerator';

export class BlocksCrafting extends ContentList<Block> {
    graphitePress = new GenericCrafter('graphite-press', {
        requirements: Stack.stacks(Items.copper, 75, Items.lead, 30),
    });

    multiPress = new GenericCrafter('multi-press', {
        requirements: Stack.stacks(Items.titanium, 100, Items.silicon, 25, Items.lead, 100,
            Items.graphite, 50),
    });

    siliconSmelter = new GenericCrafter('silicon-smelter', {
        requirements: Stack.stacks(Items.copper, 30, Items.lead, 25),
    });

    siliconCrucible = new AttributeCrafter('silicon-crucible', {
        requirements: Stack.stacks(Items.titanium, 120, Items.metaglass, 80,
            Items.plastanium, 35, Items.silicon, 60),
    });

    kiln = new GenericCrafter('kiln', {
        requirements: Stack.stacks(Items.copper, 60, Items.graphite, 30, Items.lead, 30),
    });

    plastaniumCompressor = new GenericCrafter('plastanium-compressor', {
        requirements: Stack.stacks(Items.silicon, 80, Items.lead, 115, Items.graphite, 60,
            Items.titanium, 80),
    });

    phaseWeaver = new GenericCrafter('phase-weaver', {
        requirements: Stack.stacks(Items.silicon, 130, Items.lead, 120, Items.thorium, 75),
    });

    surgeSmelter = new GenericCrafter('alloy-smelter', {
        requirements: Stack.stacks(Items.silicon, 80, Items.lead, 80, Items.thorium, 70),
    });

    cryofluidMixer = new LiquidConverter('cryofluid-mixer', {
        requirements: Stack.stacks(Items.lead, 65, Items.silicon, 40, Items.titanium, 60),
    });

    pyratiteMixer = new GenericCrafter('pyratite-mixer', {
        requirements: Stack.stacks(Items.copper, 50, Items.lead, 25),
    });

    blastMixer = new GenericCrafter('blast-mixer', {
        requirements: Stack.stacks(Items.lead, 30, Items.titanium, 20),
    });

    melter = new GenericCrafter('melter', {
        requirements: Stack.stacks(Items.copper, 30, Items.lead, 35, Items.graphite, 45),
    });

    separator = new Separator('separator', {
        requirements: Stack.stacks(Items.copper, 30, Items.titanium, 25),
    });

    disassembler = new Separator('disassembler', {
        requirements: Stack.stacks(Items.graphite, 140, Items.titanium, 100, Items.silicon, 150,
            Items.surgeAlloy, 70),
    });

    sporePress = new GenericCrafter('spore-press', {
        requirements: Stack.stacks(Items.lead, 35, Items.silicon, 30),
    });

    pulverizer = new GenericCrafter('pulverizer', {
        requirements: Stack.stacks(Items.copper, 30, Items.lead, 25),
    });

    coalCentrifuge = new GenericCrafter('coal-centrifuge', {
        requirements: Stack.stacks(Items.titanium, 20, Items.graphite, 40, Items.lead, 30),
    });

    incinerator = new Incinerator('incinerator', {
        requirements: Stack.stacks(Items.graphite, 5, Items.lead, 15),
    });
}
