import { BufferReader } from './BufferReader';

describe('BufferReader', () => {
    it('parses string', () => {
        const foo = 'foo';

        const buffer = Buffer.alloc(16);
        buffer.writeInt8(foo.length);
        buffer.write(foo, 1);

        const reader = new BufferReader(buffer);

        expect(reader.str()).toBe(foo);
    });

    it('parses int', () => {
        const foo = 42;

        const buffer = Buffer.alloc(16);
        buffer.writeInt8(foo, 4 - 1);

        const reader = new BufferReader(buffer);

        expect(reader.int()).toBe(foo);
    });
});
