import { ILinkedList, IteratorInterface, IDoubleLinkedNode } from './types';

export class DoubleLinkedNode implements IDoubleLinkedNode {
	prev: IDoubleLinkedNode | null;
	key: string;
	data: unknown;
	next: IDoubleLinkedNode | null;

	constructor(key: string, data: unknown) {
		this.key = key;
		this.data = data;
		this.prev = null;
		this.next = null;
	}
}

export class DoubleLinkedList implements ILinkedList {
	head: IDoubleLinkedNode | null;
	tail: IDoubleLinkedNode | null;
	length: number;
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(...nodes: IDoubleLinkedNode[]): void {
		this.insert(nodes[0]);
		if (nodes.length > 1) {
			this.append.apply(this, nodes.splice(1));
		}
	}
	insert(node: IDoubleLinkedNode, refNode?: IDoubleLinkedNode): void {
		if (refNode !== undefined && refNode !== null) {
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
		this.length += 1;
	}
	contains(node: IDoubleLinkedNode): boolean {
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			if (curNode === node) {
				return true;
			}
		}
		return false;
	}
	remove(node: IDoubleLinkedNode): void {
		if (!this.contains(node)) return;
		if (node.prev !== null) node.prev.next = node.next;
		if (node.next !== null) node.next.prev = node.prev;
		if (node === this.head) this.head = node.next;
		if (node === this.tail) this.tail = node.prev;
		this.length -= 1;
	}
	indexOf(node: IDoubleLinkedNode): number {
		let index = -1;
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			index += 1;
			if (curNode === node) return index;
		}
		return -1;
	}
	isEmpty(): boolean {
		return !this.head && !this.tail && this.length === 0;
	}
	reverse(): void {
		let curNode;
		let retHead = this.head;
		let retTail = this.tail;
		let next = this.iterator();
		while ((curNode = next())) {
			if (curNode === retHead) {
				curNode.prev = curNode.next;
				curNode.next = null;
				this.tail = curNode;
			} else if (curNode === retTail) {
				curNode.next = curNode.prev;
				curNode.prev = null;
				this.head = curNode;
			} else {
				let retNext = curNode.next;
				curNode.next = curNode.prev;
				curNode.prev = retNext;
			}
		}
	}
	clear(): void {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	iterator(node?: IDoubleLinkedNode): () => IDoubleLinkedNode | null {
		let curNode = node || this.head;
		return () => {
			let ret = curNode;
			if (curNode) {
				curNode = curNode.next;
				return ret;
			}
			return ret;
		};
	}

	[Symbol.iterator](): IteratorInterface {
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
