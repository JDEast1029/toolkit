import LinkedList, { StorageNode } from '../linked-list';

test('LinkedList & StorageNode can be instantiated', () => {
	const linkedList = new LinkedList();
	expect(linkedList).toBeDefined();
	const storageNode = new StorageNode('node', { expireTime: 1 });
	expect(storageNode).toBeDefined();
});

const linkedList = new LinkedList();
test('addFirst should work', () => {
	const node1 = new StorageNode('node1', { expireTime: 1 });
	linkedList.addFirst(node1);
	expect(linkedList.head).toBe(node1);

	const node2 = new StorageNode('node2', { expireTime: 2 });
	linkedList.addFirst(node2);
	expect(linkedList.head).toBe(node2);
	expect(node2.next).toBe(node1);
	expect(node1.prev).toBe(node2);
});

test('removeLast should work', () => {
	linkedList.clear();
	const lastNode = linkedList.removeLast();
	expect(lastNode).toBe(null);

	const node1 = new StorageNode('node1', { expireTime: 1 });
	const node2 = new StorageNode('node2', { expireTime: 2 });
	linkedList.addFirst(node1);
	linkedList.addFirst(node2);

	const lastNode1 = linkedList.removeLast();
	expect(lastNode1).toBe(node1);
	expect(node2.next).toBeNull();
});
