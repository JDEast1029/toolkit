import { isObject } from './utils';

export const mergeConfig = <T>(source: object, merged: object): T => {
	let mergedKeys = Object.keys(merged);
	const sourceKeys = Object.keys(source);
	let config = {};
	for (let i = 0; i < sourceKeys.length; i++) {
		const key = sourceKeys[i];
		const value = source[key];
		const mergedValue = merged[key];
		if (value !== null || value !== undefined) {
			if (isObject(value) && isObject(mergedValue)) {
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
