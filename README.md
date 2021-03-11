# mindustry.js
Library for interacting with Mindustry servers and data.

## Install

```shell
npm install mindustry.js
```
or:
```shell
yarn add mindustry.js
```

## Use

First, import the module:
```js
const { Server } = require('mindustry.js');

const server = new Server('example.com', 6567);
```

* Receiving data from a remote server

```js
server.data().then(data => console.log(data));
```

using `async/await`:

```js
const data = await server.data();

console.log(data);
```

Server#data() returns `ServerData` object:

```ts
interface ServerData {
    name: string;
    description: string;
    map: string;
    players: number;
    playerLimit: number;
    wave: number;
    version: number;
    versionType: VersionType; // official, custom, bleeding edge
    gamemode: Gamemode; // survival, sandbox, pvp, attack
}
```

## License
Licensed under the [GPLv3](LICENSE) license.
