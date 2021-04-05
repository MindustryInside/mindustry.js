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

export interface ContentProperties {
    name?: string,
    alwaysUnlocked?: boolean,
}

export abstract class Content implements ContentProperties {
    alwaysUnlocked = false;

    constructor(
        public name: string,
    ) {}

    abstract get contentType(): ContentType;

    toString(): string {
        return this.name;
    }

    init<T extends ContentProperties>(properties: T): this {
        Object.assign(this, properties);
        return this;
    }
}
