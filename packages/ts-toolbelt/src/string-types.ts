type BlankStr = ' ' | '\t' | '\n' | '\r';
// 左侧无空格
export type TrimLeft<T extends string> = T extends `${BlankStr}${infer Right}`
	? TrimLeft<Right>
	: T;
export type Trim<T extends string> = T extends
	| `${BlankStr}${infer Rest}`
	| `${infer Rest}${BlankStr}`
	? Trim<Rest>
	: T;
