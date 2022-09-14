// Without<Types, Types>
// 实现类型版本的 Lodash.Without

type ToUnion<T> = T extends any[] ? T[number] : T;
type Without<T extends any[], F, R extends any[] = []> = T extends [
  infer S,
  ...infer K
]
  ? S extends ToUnion<F>
    ? Without<K, F, [...R]>
    : Without<K, F, [...R, S]>
  : R;

// Res = [2]
type Res = Without<[1, 2], 1>;
// Res1 = [4, 5]
type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>;
// Res2 = []
type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>;

export {};
