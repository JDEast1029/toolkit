import { ILinkedList, ILinkedNode, IteratorInterface } from './types';

export class SingleLinkedNode implements ILinkedNode {
	key: string;
	data: unknown;
	next: ILinkedNode | null;

	constructor(key: string, data: unknown) {
		this.key = key;
		this.data = data;
		this.next = null;
	}
}

export class SingleLinkedList implements ILinkedList {
	head: ILinkedNode | null;
	tail: ILinkedNode | null;
	length: number;

	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	append(...nodes: ILinkedNode[]): void {
		this.insert(nodes[0]);
		if (nodes.length > 1) {
			this.append.apply(this, nodes.slice(1));
		}
	}
	insert(node: ILinkedNode, refNode?: ILinkedNode): void {
		if (refNode !== undefined) {
			if (!this.contains(refNode)) {
				console.error('目标节点不在当前链表内');
				return;
			}
			node.next = refNode.next;
			refNode.next = node;
		} else if (this.tail !== null) {
			this.tail.next = node;
			this.tail = node;
		} else {
			this.head = node;
			this.tail = node;
		}
		this.length += 1;
	}
	contains(node: ILinkedNode): boolean {
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			if (node === curNode) return true;
		}
		return false;
	}
	remove(node: ILinkedNode): void {
		if (!this.contains(node)) return;
		const prevNode = this.findPrev(node);
		if (!prevNode) {
			this.head = node.next;
		} else {
			prevNode.next = node.next;
			if (this.tail === node) {
				this.tail = prevNode;
			}
		}
		this.length -= 1;
	}
	findPrev(node: ILinkedNode): ILinkedNode | null {
		let curNode;
		let next = this.iterator();
		let prev = null;
		while ((curNode = next())) {
			if (curNode === node) return prev;
			prev = curNode;
		}
		return null;
	}
	indexOf(node: ILinkedNode): number {
		let index = -1;
		let curNode;
		let next = this.iterator();
		while ((curNode = next())) {
			index += 1;
			if (curNode === node) return index;
		}
		return index;
	}
	isEmpty(): boolean {
		return !!this.head && !!this.tail && !!this.length;
	}
	reverse(): void {
		let curNode;
		let prev;
		let retHead = this.head;
		let retTail = this.tail;
		let next = this.iterator();
		while ((curNode = next())) {
			if (curNode === retHead) {
				this.tail = curNode;
				curNode.next = null;
			} else {
				if (curNode === retTail) this.head = curNode;
				curNode.next = prev;
			}
			prev = curNode;
		}
	}
	clear(): void {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}
	iterator(node?: ILinkedNode): () => ILinkedNode | null {
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
			next() {
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
