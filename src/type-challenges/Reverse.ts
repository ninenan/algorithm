// Reverse<T>
// 实现 Array.return 的类型版本

type Reverse<T extends any[]> = T extends [...infer R, infer U]
  ? [U, ...Reverse<R>]
  : [];

// a = // ['b', 'a']
type a = Reverse<["a", "b"]>;
// b = // ['c', 'b', 'a']
type b = Reverse<["a", "b", "c"]>;

export {};
