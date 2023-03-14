import DoubleLinkedList, { LinkedNode } from './linked-list';
import { ILinkedNode, LinkedNodeWithNull } from './types';

export default class LRUCache {
	capacity: number;
	map: Map<string, ILinkedNode>;
	linkedList: DoubleLinkedList;

	constructor(capacity: number = 100) {
		this.capacity = capacity;
		this.map = new Map();
		this.linkedList = new DoubleLinkedList();
	}

	put(key: string, value: unknown) {
		let node = new LinkedNode(key, value);
		if (this.map.has(key)) {
			this.linkedList.remove(<ILinkedNode>this.map.get(key));
		} else if (this.linkedList.length >= this.capacity) {
			const lastNode = this.linkedList.removeLast();
			lastNode && this.map.delete(lastNode.key);
		}
		this.linkedList.addFirst(node);
		this.map.set(key, node);
	}

	get(key: string): unknown {
		if (!this.map.has(key)) {
			console.error(`未找到索引${key}对应的缓存数据`);
			return null;
		}
		const targetNode = <ILinkedNode>this.map.get(key);
		this.put(key, targetNode.data);
		return targetNode.data;
	}
}
