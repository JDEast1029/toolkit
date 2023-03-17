import { History, Stack } from '..';

test('History & Stack returned something', () => {
	expect(new History()).toBeDefined();
	expect(new Stack()).toBeDefined();
});

let stack = new Stack();
test('Stack length & push should work', () => {
	stack.push(1);
	expect(stack.length).toBe(1);
});

test('Stack pop & peek should work', () => {
	stack.clear();
	stack.push(1);
	expect(stack.push(3)).toBe(2);
	expect(stack.pop()).toBe(3);
	expect(stack.peek()).toBe(1);
});

test('Stack iterator should work', () => {
	stack.clear();
	stack.push(1);
	stack.push(2);
	stack.push(3);
	expect([...stack]).toEqual([1, 2, 3]);
});

let history = new History();
test('History push should work', () => {
	history.push(2);
	expect(history.length).toBe(1);
	history.undo();
	expect(history.length).toBe(0);
});

test('History undo should work', () => {
	history.clear();
	history.push(2);
	history.undo();
	expect(history.length).toBe(0);
	expect(history.undo()).toBeUndefined();
});

test('History redo should work', () => {
	history.clear();
	history.push(2);
	history.undo();
	expect(history.length).toBe(0);
	history.redo();
	expect(history.length).toBe(1);
	expect(history.redo()).toBeUndefined();
});

test('History iterate should work', () => {
	history.clear();
	history.push(2);
	history.push(1);
	expect([...history]).toEqual([2, 1]);
});
