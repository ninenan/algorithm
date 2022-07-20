// Parameters<Type>
// 用于根据所有Type中函数类型的参数构造一个元祖类型。

type fun1 = (a: number, b: string) => void;
// T0 = []
type T0 = Parameters<() => string>;
// T1 = [s: string]
type T1 = Parameters<(s: string) => string>;
// T2 = [args: unknown]
type T2 = Parameters<<T>(args: T) => T>;
// T3 = [a: number, b: string]
type T3 = Parameters<fun1>;

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

// T4 = []
type T4 = MyParameters<() => string>;
// T5 = [s: string]
type T5 = MyParameters<(s: string) => string>;
// T6 = [args: unknown]
type T6 = MyParameters<<T>(args: T) => T>;
// T7 = [a: number, b: string]
type T7 = MyParameters<fun1>;

export {};
