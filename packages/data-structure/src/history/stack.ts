export class Stack {
	private list: unknown[];

	constructor() {
		this.list = [];
	}

	get length(): number {
		return this.list.length;
	}

	// 向栈中添加元素, 返回长度
	push(value: unknown): number {
		return this.list.push(value);
	}

	// 返回栈顶元素
	peek() {
		return this.list[this.length - 1];
	}

	// 返回并删除栈顶元素的操作。
	pop() {
		return this.list.pop();
	}

	clear() {
		this.list = [];
	}

	[Symbol.iterator]() {
		let index = 0;
		return {
			next: () => {
				if (index < this.length) {
					const value = this.list[index];
					index++;
					return { done: false, value };
				}
				return { done: true };
			},
		};
	}
}
