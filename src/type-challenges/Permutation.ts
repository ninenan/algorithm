// Permutation<Types>
// 实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。
// Perm = ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
// type Perm = Permutation<'A' | 'B' | 'C'>

// [T] extends [never]
// 因为 T 是一个联合类型，如果是 T extends never，条件类型得到的是一个联合类型，这里主要是处理联合类型是空的情况
// T extends T
// T 代表是当前迭代类型
// Exclude<U, T>
// T 是当前的迭代类型，需要从原水类型中排除掉当前的迭代类型
// Permutation<Exclude<U, T>>
// 递归调用，如果当前的 T 是 A，那么就会执行 Permutation<'B' | 'C'>，递归之后的结果就是 ['A', ...['B', 'C']] ['A', ...['C', 'B']]

type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends T
  ? [T, ...Permutation<Exclude<U, T>>]
  : never;

type T1 = Permutation<"a" | "b" | "c">;

export {};
