import { Exclude } from '../lib/union-types';
// 对象属性变成不必填
export type Partial<T> = { [K in keyof T]?: T[K] };

// 对象属性变成必填
export type Required<T> = { [K in keyof T]-?: T[K] };

// {name: 1} & {age: 1} => { name: 1, aget: 1}
export type MergeAnd<T> = {
	[K in keyof T]: T[K];
};

// 对象属性变成只读
export type Readonly<T> = { readonly [K in keyof T]: T[K] };
export type ReadonlyByKeys<T, K extends keyof T = keyof T> = MergeAnd<
	Omit<T, K> & {
		readonly [P in K]: T[P];
	}
>;
export type DeepReadonly<T extends object> = {
	readonly [K in keyof T]: T[K] extends Function
		? T[K]
		: T[K] extends Array<unknown>
		? T[K]
		: T[K] extends object
		? DeepReadonly<T[K]>
		: T[K];
};

// 对象属性变成可写
export type Writable<T> = { -readonly [K in keyof T]: T[K] };

// 从目标对象中选出指定的几个属性
export type Pick<T, U extends keyof T> = { [K in U]: T[K] };

// 从T中选出不包含在U内的属性
export type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;

// 构造一个属性为K，类型为T的类型
export type Record<K extends keyof any, T> = { [P in K]: T };

export type Merge<T extends object, U extends object> = {
	[K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never;
};

export type RequiredByKeys<T extends object, K extends keyof T = keyof T> = MergeAnd<
	{
		[P in keyof T as P extends K ? P : never]-?: T[P];
	} & {
		[P in keyof T as P extends K ? never : P]: T[P];
	}
>;

export type PartialByKeys<T extends object, K extends keyof T = keyof T> = MergeAnd<
	{
		[P in keyof T as P extends K ? P : never]+?: T[P];
	} & {
		[P in keyof T as P extends K ? never : P]: T[P];
	}
>;
