export function keys<T>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}
