import { StorageType } from './types';
import LRUCache from './lru-cache';

class Storage {
	type: StorageType;
	prefix: string = '@sf/utils';
	version: string = '1.0.0';
	lruCache: LRUCache;

	constructor(storageType: StorageType) {
		this.type = storageType;
		this.lruCache = new LRUCache();
	}

	get length(): number {
		return window[this.type].length;
	}

	key(n: number): string | null {
		return window[this.type].key(n);
	}

	// 带有prefix和version标记的键名
	ownKeys(): string[] {
		let keys: string[] = [];
		for (let i = 0; i < this.length; i++) {
			const keyName = this.key(i);
			if (keyName && keyName.startsWith(`${this.prefix}@${this.version}`)) {
				keys.push(keyName);
			}
		}
		return keys;
	}

	setPrefix(prefix: string): void {
		this.prefix = prefix;
	}

	setVersion(version: string): void {
		if (version === this.version) return;
		this.version = version;
		this.clearPrevVersion(version);
	}

	set(key: string, value: unknown): void {
		const stringifyValue = JSON.stringify(value);
		try {
			window[this.type].setItem(`${this.prefix}@${this.version}:${key}`, stringifyValue);
		} catch (error) {
			console.error(`@sf/utils: Storage.setItem error: ${error}`);
			this.lruCache.put(key, value);
		}
	}
	get(key: string): unknown {
		let resultString = window[this.type].getItem(`${this.prefix}@${this.version}:${key}`);
		if (resultString === null) {
			resultString = <string>this.lruCache.get(key);
		}
		return resultString ? JSON.parse(resultString) : null;
	}

	remove(key: string) {
		window[this.type].removeItem(key);
	}

	clear() {
		window[this.type].clear();
	}

	clearOwnKeys() {
		const keys = this.ownKeys();
		keys.forEach((key) => {
			this.remove(key);
		});
	}
	clearPrevVersion(curVersion: string) {
		let keys: string[] = [];
		for (let i = 0; i < this.length; i++) {
			const keyName = this.key(i);
			if (keyName && keyName.startsWith(this.prefix) && !keyName.includes(curVersion)) {
				keys.push(keyName);
			}
		}
		keys.forEach((key) => {
			this.remove(key);
		});
	}
}

export const LocalStorage = new Storage('localStorage');
export const SessionStorage = new Storage('sessionStorage');
