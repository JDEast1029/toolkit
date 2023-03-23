import LinkedList, { StorageNode } from './linked-list';
import { IStorageNode } from './types';
import { StorageData } from './types';

export default class LRUCache {
	capacity: number;
	map: Map<string, IStorageNode>;
	linkedList: LinkedList;

	constructor(capacity: number = 100) {
		this.capacity = capacity;
		this.map = new Map();
		this.linkedList = new LinkedList();
	}

	put(key: string, data: StorageData) {
		let node = new StorageNode(key, data);
		if (this.map.has(key)) {
			this.linkedList.remove(<IStorageNode>this.map.get(key));
		} else if (this.linkedList.length >= this.capacity) {
			const lastNode = this.linkedList.removeLast();
			lastNode && this.map.delete(lastNode.key);
		}
		this.linkedList.addFirst(node);
		this.map.set(key, node);
	}

	get(key: string): StorageData | null {
		if (!this.map.has(key)) {
			console.error(`未找到索引${key}对应的缓存数据`);
			return null;
		}
		const targetNode = <IStorageNode>this.map.get(key);
		this.put(key, targetNode.data);

		return targetNode.data;
	}

	clear() {
		this.map.clear();
		this.linkedList.clear();
	}
}
