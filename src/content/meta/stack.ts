import { Content } from '../content';

export class Stack<T extends Content<T>> {
    private constructor(
        public value: T,
        public amount: number,
    ) {}

    static of<C extends Content<C>>(value: C, amount: number): Stack<C> {
        return new Stack<C>(value, amount);
    }

    set(value: T, amount: number): void {
        this.value = value;
        this.amount = amount;
    }

    copy(): Stack<T> {
        return new Stack(this.value, this.amount);
    }

    equals(other: Stack<T>): boolean {
        return other && other.value === this.value && other.amount === this.amount;
    }

    toString(): string {
        return `Stack{value=${this.value.toString()}, amount=${this.amount}}`;
    }
}
