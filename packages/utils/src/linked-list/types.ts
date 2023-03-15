export interface ILinkedNode {
	key: string;
	data: unknown;
	next: ILinkedNode | null;
}

export interface IDoubleLinkedNode extends ILinkedNode {
	prev: IDoubleLinkedNode | null;
}
