export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
	? true
	: false;

// 属性type需要指定，只能用在特定的情况下
// export type LookUp<T, U> = T extends { type: U } ? T : never;

export type NonNullable<T> = T extends null | undefined ? never : T;
