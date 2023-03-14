/**
 * 1. int、string、boolean、undefined、null
 * 2. object
 * 3. array
 * 4. symbol
 * 5. Date
 */
const isObject = (obj: unknown): boolean => {
	return typeof obj === 'object' && obj !== null;
};

const isBuiltInObject = (obj: unknown): boolean => {
	return !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
};

type QueueElement = {
	value: object;
	parent: unknown[] | object;
};
export const cloneDeep = (source: unknown) => {
	let hash = new WeakMap();
	if (!isObject(source)) return source;

	// 内置对象
	if (isBuiltInObject(source)) {
		return source;
	}

	let result = Array.isArray(source) ? [] : {};
	let queue: QueueElement[] = [{ value: source as object, parent: result }];

	while (queue.length) {
		const target = <QueueElement>queue.shift();
		let parent = target.parent;
		let keys = Reflect.ownKeys(target.value);

		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			const value = target.value[key];
			if (hash.has(value)) {
				parent[key] = hash.get(value);
			} else if (!isObject(value) || isBuiltInObject(value)) {
				parent[key] = value;
			} else {
				hash.set(value, value);
				parent[key] = Array.isArray(value) ? [] : {};
				queue.push({
					parent: parent[key],
					value,
				});
			}
		}
	}

	return result;
};
