import { isObject } from './utils';

export const mergeConfig = <T>(source: object, merged: object): T => {
	let mergedKeys = Object.keys(merged);
	const globalKeys = Object.keys(source);
	let config = {};
	for (let i = 0; i < globalKeys.length; i++) {
		const key = globalKeys[i];
		const value = source[key];
		const mergedValue = merged[key];
		if (value) {
			if (isObject(value) && mergedValue && isObject(mergedValue)) {
				config[key] = [...value, ...mergedValue];
			} else {
				config[key] = value;
			}
		}
		// 过滤掉已经匹配上的默认值
		mergedKeys = mergedKeys.filter((it) => it !== key);
	}
	if (mergedKeys.length) {
		for (let i = 0; i < mergedKeys.length; i++) {
			const key = mergedKeys[i];
			config[key] = merged[key];
		}
	}
	return config as T;
};
