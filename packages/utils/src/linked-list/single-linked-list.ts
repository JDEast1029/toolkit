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
	header: ILinkedNode | null;
	tail: ILinkedNode | null;
	length: number;

	constructor() {
		this.header = null;
		this.tail = null;
		this.length = 0;
	}

	append(...nodes: ILinkedNode[]): void {
		throw new Error('Method not implemented.');
	}
	insert(node: ILinkedNode, refNode: ILinkedNode): void {
		throw new Error('Method not implemented.');
	}
	contains(node: ILinkedNode): boolean {
		throw new Error('Method not implemented.');
	}
	remove(node: ILinkedNode): void {
		throw new Error('Method not implemented.');
	}
	indexOf(node: ILinkedNode): number {
		throw new Error('Method not implemented.');
	}
	isEmpty(): boolean {
		throw new Error('Method not implemented.');
	}
	reverse(): void {
		throw new Error('Method not implemented.');
	}
	clear(): void {
		throw new Error('Method not implemented.');
	}
	iterator(node: ILinkedNode): () => void {
		throw new Error('Method not implemented.');
	}
	[Symbol.iterator](): IteratorInterface {
		throw new Error('Method not implemented.');
	}
}
