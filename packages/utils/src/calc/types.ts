// 方法参数
export type CalcParam = number | string;

export type EmptyObject = {
	[key: string]: unknown;
};

export type ExtendFunction = <T>(context: T, ...restOfName: string[]) => T;
