import { Content } from '../content';

export class Stack<T extends Content<T>> {
    private constructor(
        public value: T,
        public amount: number,
    ) {}

    static of<C extends Content<C>>(value: C, amount: number): Stack<C> {
        return new Stack<C>(value, amount);
    }

    static stacks<C extends Content<C>>(
            value: C, amount: number,
            ...values: (C | number)[]
        ): Stack<C>[] {
        const arr = [Stack.of(value, amount)];

        for (let i = 0; i < values.length; i += 2) {
            arr.push(Stack.of(values[i] as C, values[i + 1] as number));
        }

        return arr;
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
