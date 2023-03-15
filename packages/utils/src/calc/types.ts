// 方法参数
export type Value = number | string;

export type EmptyObject = {
	[key: string]: unknown;
};

export type ExtendFunction = <T>(context: T, ...restOfName: Value[]) => T;
