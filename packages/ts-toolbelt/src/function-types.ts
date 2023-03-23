export type ReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;
