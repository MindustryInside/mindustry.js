import { ServerView } from '../ServerData';

test('should parse buffer', () => {
    const name = 'Server';
    const map = 'Fortress';

    const buffer = Buffer.alloc(500);
    buffer[0] = name.length;
    buffer.write(name, 1);

    buffer[7] = map.length;
    buffer.write(map, 8);

    expect(ServerView.from(buffer)).toHaveProperty('name', name);
    expect(ServerView.from(buffer)).toHaveProperty('map', map);
});
