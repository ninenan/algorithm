// IsNever<Types>
// 实现一个类型 IsNever，它接受输入类型 T。如果类型解析为 never，则返回 true，否则返回 false。

type IsNever<T> = T[] extends never[] ? true : false;

// A = true
type A = IsNever<never>  // expected to be true
// B = false
type B = IsNever<undefined> // expected to be false
// C = false
type C = IsNever<null> // expected to be false
// D = false
type D = IsNever<[]> // expected to be false
// E = false
type E = IsNever<number> // expected to be false

export {};
