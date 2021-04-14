export function keys<T>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}

export function properties<T>(obj: T): (keyof T)[] {
    return Object.getOwnPropertyNames(obj) as (keyof T)[];
}
