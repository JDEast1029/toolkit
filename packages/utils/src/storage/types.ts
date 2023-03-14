export type StorageType = 'localStorage' | 'sessionStorage';

export interface IStorage {
	setPrefix(prefix: string): void;
	setVersion(version: string): void;
	set(key: string, value: unknown): void;
	get(key: string): unknown;
	remove(key: string);
	clear();
	// 该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名。
	key(n: number): string;
	readonly length: number;
}

export interface ILinkedNode {
	key: string;
	data: unknown;
	next: ILinkedNode | null;
	prev: ILinkedNode | null;
}

export type LinkedNodeWithNull = ILinkedNode | null;
