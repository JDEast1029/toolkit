import { Equal } from './base-types';

// type Arr = ['1', '2', '3']; type Test = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
export type TupleToUnion<T extends unknown[]> = T[number];

export type TupleLength<T extends readonly unknown[]> = T['length'];

export type Pop<T extends unknown[]> = T extends [...infer R, infer L] ? R : never;

export type Push<T extends unknown[], U> = [...T, U];

export type Unshift<T extends unknown[], U> = [U, ...T];

export type Includes<T extends unknown[], U> = T extends [infer P, ...infer R]
	? Equal<P, U> extends true
		? true
		: Includes<R, U>
	: false;

export type Contact<T extends unknown[], U extends unknown[]> = [...T, ...U];
