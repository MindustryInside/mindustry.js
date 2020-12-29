export type IP = `${number}.${number}.${number}.${number}`;
export type LocalHost = 'localhost';
export type Host = `${string}://${string}.${string}` | LocalHost;
export type Address = IP | Host;
