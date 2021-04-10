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

export abstract class Content
    <T extends ContentProperties> implements ContentProperties {
    name: string;
    alwaysUnlocked = false;

    constructor(name: string, constructor?: T) {
        this.name = name;
        this.init(constructor);
    }

    abstract get contentType(): ContentType;

    private init(properties?: T): this {
        Object.assign(this, properties);
        return this;
    }

    toString(): string {
        return this.name;
    }
}
