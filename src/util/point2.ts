/* eslint-disable no-bitwise */

/**
 * @see https://github.com/Anuken/Arc/blob/master/arc-core/src/arc/math/geom/Point2.java
 */
export class Point2 {
    constructor(
        public x: number,
        public y: number,
    ) {}

    static unpack(pos: number): Point2 {
        return new Point2((pos >>> 16), (pos & 0xFFFF));
    }

    static pack(x: number, y: number): number {
        return (x << 16) | (y & 0xFFFF);
    }

    static x(pos: number): number {
        return (pos >>> 16);
    }

    static y(pos: number): number {
        return (pos & 0xFFFF);
    }

    pack(): number {
        return Point2.pack(this.x, this.y);
    }

    set(x: number, y: number): Point2 {
        this.x = x;
        this.y = y;
        return this;
    }

    dst2(other: Point2): number {
        const xd = other.x - this.x;
        const yd = other.y - this.y;

        return xd * xd + yd * yd;
    }

    dst(other: Point2): number {
        const xd = other.x - this.x;
        const yd = other.y - this.y;

        return Math.sqrt(xd ** 2 + yd ** 2);
    }

    add(other: Point2): Point2 {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other: Point2): Point2 {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    cpy(): Point2 {
        return new Point2(this.x, this.y);
    }

    rotate(steps: number): Point2 {
        for (let i = 0; i < Math.abs(steps); i++) {
            const { x } = this;
            if (steps >= 0) {
                this.x = -this.y;
                this.y = x;
            } else {
                this.x = this.y;
                this.y = -x;
            }
        }
        return this;
    }

    equals(x: number, y: number): boolean {
        return this.x === x && this.y === y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}
