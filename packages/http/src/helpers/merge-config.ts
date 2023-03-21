import { isObject } from './utils';

export const mergeConfig = <T>(source: object, merged: object): T => {
	let defaultKeys = Object.keys(merged);
	const globalKeys = Object.keys(source);
	let config = {};
	for (let i = 0; i < globalKeys.length; i++) {
		const key = globalKeys[i];
		const value = source[key];
		const defaultValue = merged[key];
		if (value) {
			if (isObject(value) && defaultValue && isObject(defaultValue)) {
				config[key] = [...value, ...defaultValue];
			} else {
				config[key] = value;
			}
		}
		// 过滤掉已经匹配上的默认值
		defaultKeys = defaultKeys.filter((it) => it !== key);
	}
	if (defaultKeys.length) {
		for (let i = 0; i < defaultKeys.length; i++) {
			const key = defaultKeys[i];
			config[key] = merged[key];
		}
	}
	return config as T;
};
