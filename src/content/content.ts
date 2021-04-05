export enum ContentType {
    item,
    block,
    mech_UNUSED,
    bullet,
    liquid,
    status,
    unit,
    weather,
    effect_UNUSED,
    sector,
    loadout_UNUSED,
    typeid_UNUSED,
    error,
    planet,
    ammo,
}

export abstract class Content {
    constructor(
        public name: string,
    ) {}

    abstract get contentType(): ContentType;

    toString(): string {
        return this.name;
    }
}
