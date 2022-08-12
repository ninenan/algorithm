// MinusOne<NumberTypes>
// 给定一个数字(总是正数)作为类型。您的类型应该返回减少一的数字。

type MinusOne<T extends number, U extends any[] = []> = T extends U["length"]
  ? U extends [infer F, ...infer Rest]
    ? Rest["length"]
    : never
  : MinusOne<T, [0, ...U]>;

// T1 = 0
type T1 = MinusOne<1>
// T2 = 68
type T2 = MinusOne<69>

export {};
