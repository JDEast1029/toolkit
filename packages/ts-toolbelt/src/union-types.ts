// 从T中过滤掉U内包含的部分
export type Exclude<T, U> = T extends U ? never : T;

// 提取T中包含U属性部分
export type Extract<T, U> = T extends U ? T : never;
