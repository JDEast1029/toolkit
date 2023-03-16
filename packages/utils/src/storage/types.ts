import { IDoubleLinkedNode } from '../linked-list/types';
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

export type StorageOptionConfig = {
	expireTime?: number;
};

export type StorageData = {
	data?: unknown;
	expireTime: number; // 过期时间戳，取值时如果过期返回空，并且清除当前的缓存
};

export interface IStorageNode extends IDoubleLinkedNode {
	data: StorageData;
	next: IStorageNode | null;
	prev: IStorageNode | null;
}

export type StorageNodeWithNull = IStorageNode | null;
