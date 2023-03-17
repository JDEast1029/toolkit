import { IStorageNode, StorageData } from './types';
import { DoubleLinkedList } from '@shfang/data-structure';

export class StorageNode implements IStorageNode {
	key: string;
	data: StorageData;
	next: IStorageNode | null;
	prev: IStorageNode | null;

	constructor(key: string, data: StorageData) {
		this.key = key;
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

export default class LinkedList extends DoubleLinkedList {
	override head: IStorageNode | null;
	override tail: IStorageNode | null;
	override length: number;

	constructor() {
		super();
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	addFirst(node: IStorageNode) {
		if (this.head === null) {
			this.insert(node);
			return;
		}
		node.next = this.head;
		this.head.prev = node;
		this.head = node;
		this.length++;
	}

	removeLast(): IStorageNode | null {
		let lastNode = this.tail;
		if (lastNode === null) return null;
		this.remove(lastNode);
		return lastNode;
	}
}
