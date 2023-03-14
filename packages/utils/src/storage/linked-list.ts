import { ILinkedNode, LinkedNodeWithNull, StorageData } from './types';

export class LinkedNode implements ILinkedNode {
	key: string;
	data: StorageData;
	next: LinkedNodeWithNull;
	prev: LinkedNodeWithNull;

	constructor(key: string, data: StorageData) {
		this.key = key;
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

export default class DoubleLinkedList {
	head: LinkedNodeWithNull;
	tail: LinkedNodeWithNull;
	length: number;

	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(...nodes: ILinkedNode[]) {
		const node = nodes.shift();
		if (node) {
			this.insert(node);
			this.append.apply(this, nodes);
		}
	}

	insert(node: ILinkedNode, refNode?: ILinkedNode) {
		if (refNode !== undefined) {
			if (!this.contains(refNode)) {
				console.error('目标节点不在当前链表内');
				return;
			}
			node.next = refNode.next;
			refNode.next = node;
			node.prev = refNode;
		} else if (this.tail !== null) {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		} else {
			node.prev = null;
			this.head = node;
			this.tail = node;
		}
		this.length++;
	}

	addFirst(node: ILinkedNode) {
		if (this.head === null) {
			this.insert(node);
			return;
		}
		node.next = this.head;
		this.head.prev = null;
		this.head = node;
		this.length++;
	}

	remove(node: ILinkedNode) {
		if (!this.contains(node)) return;
		if (node.prev !== null) node.prev.next = node.next;
		if (node.next !== null) node.next.prev = node.prev;
		if (node === this.head) this.head = node.next;
		if (node === this.tail) this.tail = node.prev;
		this.length -= 1;
	}

	removeLast(): LinkedNodeWithNull {
		let lastNode = this.tail;
		if (lastNode === null) return null;
		this.remove(lastNode);
		return lastNode;
	}

	contains(node: ILinkedNode): boolean {
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			if (curNode === node) {
				return true;
			}
		}
		return false;
	}

	// 返回指定元素所在链表的索引，元素不存在则返回-1，若存在多个相同元素，则返回第一次出现的索引下标。
	indexOf(node) {
		let index = -1;
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			index += 1;
			if (curNode === node) return index;
		}
		return index;
	}

	isEmpty() {
		return this.head && this.tail && this.length;
	}

	clear() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	iterator(curNode = this.head) {
		return () => {
			let ret = curNode;
			if (curNode) {
				curNode = curNode.next;
				return ret;
			}
			return ret;
		};
	}

	[Symbol.iterator]() {
		let curNode = this.head;
		return {
			next: () => {
				if (curNode) {
					const value = curNode.data;
					curNode = curNode.next;
					return { done: false, value: value };
				}
				return { done: true, value: undefined };
			},
		};
	}
}
