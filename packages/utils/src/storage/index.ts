import { StorageType, StorageOptionConfig } from './types';
import LRUCache from './lru-cache';

// 缓存时长
const CACHE_TIMESTAMP = 24 * 60 * 60 * 1000;

class Storage {
	private lruCache: LRUCache; // storage存储异常时存放在内存中, 这里lru目前不是必须的
	type: StorageType;
	prefix: string = '@sf/utils';
	version: string = '1.0.0';

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

	set(key: string, data: unknown, options?: StorageOptionConfig): void {
		// 设置缓存时长，默认一天
		let expireTime;
		if (options === undefined || options.expireTime === undefined) {
			expireTime = new Date().getTime() + CACHE_TIMESTAMP;
		} else {
			expireTime = options.expireTime;
		}

		const storageData = { expireTime, data };
		const stringifyValue = JSON.stringify(storageData);

		try {
			window[this.type].setItem(`${this.prefix}@${this.version}:${key}`, stringifyValue);
		} catch (error) {
			console.error(`@sf/utils: Storage.setItem error: ${error}`);
			this.lruCache.put(key, storageData);
		}
	}
	get(key: string): unknown {
		let resultString = window[this.type].getItem(`${this.prefix}@${this.version}:${key}`);
		let result;
		if (resultString === null) {
			result = this.lruCache.get(key);
			if (!!result) return result.data;
			return null;
		}
		result = JSON.parse(resultString);

		// 缓存过期，清除缓存
		if (result.expireTime < new Date().getTime()) {
			this.remove(key);
			return null;
		}

		return result.data;
	}

	remove(key: string) {
		window[this.type].removeItem(key);
	}

	clear() {
		window[this.type].clear();
		this.lruCache.clear();
	}

	clearOwnKeys() {
		const keys = this.ownKeys();
		keys.forEach((key) => {
			this.remove(key);
		});
	}
	private clearPrevVersion(curVersion: string) {
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
