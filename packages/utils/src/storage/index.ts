import { StorageType } from './types';

class Storage {
	type: StorageType;
	prefix: string = '@sf/utils';
	version: string = '1.0.0';

	constructor(storageType: StorageType) {
		this.type = storageType;
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
		this.clearOwnKeys();
	}

	setVersion(version: string): void {
		this.version = version;
		this.clearOwnKeys();
	}

	set(key: string, value: unknown): void {
		window[this.type].setItem(`${this.prefix}@${this.version}:${key}`, JSON.stringify(value));
	}
	get(key: string): unknown {
		const resultString = window[this.type].getItem(`${this.prefix}@${this.version}:${key}`);
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
}

export const LocalStorage = new Storage('localStorage');
export const SessionStorage = new Storage('sessionStorage');
