import { DoubleLinkedList, DoubleLinkedNode } from '../double-linked-list';
import { IDoubleLinkedNode } from '../types';

test('DoubleLinkedList & DoubleLinkedNode should can instantiated', () => {
	expect(new DoubleLinkedList()).toBeDefined();
	expect(new DoubleLinkedNode('1', 1)).toBeDefined();
});

const linkedList = new DoubleLinkedList();
test('append & insert function should work', () => {
	const node1 = new DoubleLinkedNode('node1', 1);
	const node2 = new DoubleLinkedNode('node2', 2);
	const node3 = new DoubleLinkedNode('node3', 3);
	const node4 = new DoubleLinkedNode('node4', 4);
	linkedList.append(node1, node2);
	expect(linkedList.length).toBe(2);
	expect(linkedList.head?.key).toBe('node1');
	expect(linkedList.tail?.key).toBe('node2');

	linkedList.insert(node3, node1);
	linkedList.insert(node3, node4);
	expect(linkedList.length).toBe(3);
	expect(linkedList.head?.next?.key).toBe('node3');
});

test('remove function should work', () => {
	linkedList.clear();
	const node1 = new DoubleLinkedNode('node1', 1);
	const node2 = new DoubleLinkedNode('node2', 2);
	const node3 = new DoubleLinkedNode('node3', 3);
	linkedList.remove(node1);
	linkedList.append(node1, node2, node3);
	expect(linkedList.tail?.key).toBe('node3');
	linkedList.remove(node3);
	expect(linkedList.tail?.key).toBe('node2');
	linkedList.insert(node3);
	linkedList.remove(<IDoubleLinkedNode>linkedList.head);
	expect(linkedList.head?.key).toBe('node2');
	linkedList.remove(<IDoubleLinkedNode>linkedList.tail);
	expect(linkedList.tail?.key).toBe('node2');
});

test('indexOf function should work', () => {
	linkedList.clear();
	const node1 = new DoubleLinkedNode('node1', 1);
	const node2 = new DoubleLinkedNode('node2', 2);
	const node3 = new DoubleLinkedNode('node3', 3);
	const node4 = new DoubleLinkedNode('node4', 4);
	linkedList.append(node1, node2, node3);

	expect(linkedList.indexOf(node4)).toBe(-1);
	expect(linkedList.indexOf(node2)).toBe(1);
});
test('isEmpty function should work', () => {
	linkedList.clear();
	expect(linkedList.isEmpty()).toBeTruthy();
	const node1 = new DoubleLinkedNode('node1', 1);
	const node2 = new DoubleLinkedNode('node2', 2);
	const node3 = new DoubleLinkedNode('node3', 3);
	linkedList.append(node1, node2, node3);

	expect(linkedList.isEmpty()).toBeFalsy();
});

test('reverse function should work', () => {
	linkedList.clear();
	expect(linkedList.isEmpty()).toBeTruthy();
	const node1 = new DoubleLinkedNode('node1', 1);
	const node2 = new DoubleLinkedNode('node2', 2);
	const node3 = new DoubleLinkedNode('node3', 3);
	linkedList.append(node1, node2, node3);
	linkedList.reverse();
	expect(linkedList.head?.key).toBe('node3');
	expect(linkedList.tail?.key).toBe('node1');
});

test('[Symbol.iterator] function should work', () => {
	linkedList.clear();
	const node1 = new DoubleLinkedNode('node1', 1);
	const node2 = new DoubleLinkedNode('node2', 2);
	const node3 = new DoubleLinkedNode('node3', 3);
	linkedList.append(node1, node2, node3);
	expect([...linkedList]).toEqual([1, 2, 3]);
});
