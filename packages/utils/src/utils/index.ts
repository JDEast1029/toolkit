import { TreeNode } from './types';
export * from './clone-deep';

export const compose = (...fns) =>
	fns.reduceRight(
		(pre, cur) =>
			(...args) =>
				cur(pre(...args)),
	);

export const curry = (fn, arity = fn.length, ...args) =>
	arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

export const getQuery = (url: string) => {
	return url.match(/([^?=&]+)(=([^&])*)/g)?.reduce((pre, cur) => {
		const [key, value] = cur.split('=');
		pre[key] = value;
		return pre;
	}, {});
};

export const parseTreeData = (
	treeData: object,
	valueKey: string,
	labelKey: string,
	childrenKey: string,
): TreeNode | null => {
	if (typeof treeData === 'object') {
		return JSON.parse(
			JSON.stringify(treeData)
				.replace(new RegExp(valueKey, 'g'), 'value')
				.replace(new RegExp(labelKey, 'g'), 'label')
				.replace(new RegExp(`children|${childrenKey}`, 'g'), 'children'),
		);
	}
	console.error('参数错误');
	return null;
};

export const array2Map = (
	data: never[],
	labelKey: string = 'label',
	valueKey: string = 'value',
) => {
	return data.reduce((pre, cur) => {
		pre[cur[labelKey]] = cur[valueKey];
		return pre;
	}, {});
};

/**
 * timestamp在某些场景下是有必要的
 */
const timestamp = +new Date();
let index = 0;
export const getUid = (prefix = '@shfang/utils') => {
	return `${prefix}-${timestamp}-${++index}`;
};
