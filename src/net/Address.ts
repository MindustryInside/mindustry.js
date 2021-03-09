export type IP =
    | `${number}.${number}.${number}.${number}`
    | `${number}:${number}:${number}:${number}:${number}:${number}:${number}:${number}`;

export type Host = `${string}.${string}` | 'localhost';

export type Address = IP | Host;
