export interface ILinkedNode {
	key: string;
	data: unknown;
	next: ILinkedNode | null;
}

export interface IDoubleLinkedNode extends ILinkedNode {
	prev: IDoubleLinkedNode | null;
	next: IDoubleLinkedNode | null;
}

export interface IteratorInterface {
	next: () => {
		value: any;
		done: boolean;
	};
}
export interface ILinkedList {
	head: ILinkedNode | null;
	tail: ILinkedNode | null;
	length: number;
	append(...nodes: ILinkedNode[]): void;
	insert(node: ILinkedNode, refNode?: ILinkedNode): void;
	contains(node: ILinkedNode): boolean;
	remove(node: ILinkedNode): void;
	indexOf(node: ILinkedNode): number;
	isEmpty(): boolean;
	reverse(): void;
	clear(): void;
	iterator(node?: ILinkedNode): () => ILinkedNode | null;
	[Symbol.iterator](): IteratorInterface;
}
