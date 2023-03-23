export type Required<T> = { [P in keyof T]-?: T[P] };

export type Merge<T> = {
	[K in keyof T]: T[K];
};

export type RequiredByKeys<T, K = keyof T> = Merge<
	{
		[P in keyof T as P extends K ? P : never]-?: T[P];
	} & {
		[P in keyof T as P extends K ? never : P]: T[P];
	}
>;

export type Nullable<T> = T | null;
