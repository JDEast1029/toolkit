import { Stack } from './stack';

class History {
	private undoStack: Stack;
	private redoStack: Stack;

	constructor() {
		this.undoStack = new Stack(); // 正常的入栈记录
		this.redoStack = new Stack(); // 回退栈
	}

	get length() {
		return this.undoStack.length;
	}

	push(value) {
		this.undoStack.push(value);
		this.redoStack.clear();
	}

	// 回滚
	undo(delta: number = 1) {
		while (delta > 0) {
			let value = this.undoStack.pop();
			if (value === undefined) {
				console.warn('History 无法回滚');
				return;
			}
			this.redoStack.push(value);
			delta--;
		}
	}

	// 重做
	redo(delta: number = 1) {
		while (delta > 0) {
			let value = this.redoStack.pop();
			if (value === undefined) {
				console.warn('History 无法前进');
				return;
			}
			this.undoStack.push(value);
			delta--;
		}
	}

	clear() {
		this.undoStack.clear();
		this.redoStack.clear();
	}

	[Symbol.iterator]() {
		let index = 0;
		let list = [...this.undoStack];
		return {
			next: () => {
				if (index < this.length) {
					const value = list[index];
					index++;
					return { done: false, value };
				}
				return { done: true };
			},
		};
	}
}

export { History, Stack };
