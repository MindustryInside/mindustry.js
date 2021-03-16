import { Server } from './server';
import { Host } from '../net/host';

const testServer = new Host('obvilionnetwork.ru', 7001);

describe('Server', () => {
    it('gets server data', () => {
        const server = new Server(testServer.hostname, testServer.port);

        return server.getData().then((data) => {
            expect(data).toHaveProperty('name', '[#75ddfb]Obvilionnetwork.ru [#5b5b5b]| [#d3a3fb]Recapture');
            expect(data).toHaveProperty('gamemode', 'pvp');
            expect(data).toHaveProperty('versionType', 'official');
            expect(data).toHaveProperty('playerLimit', 0);
        });
    });
});
