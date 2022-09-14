// Fill<Types, Types>
// 实现 fill 不考虑索引

type Fill<T extends any[], R> = T extends [K, ...infer S]
  ? [R, ...Fill<S, R>]
  : [];

// exp = [0, 0, 0]
type exp = Fill<[1, 2, 3], 0>;
// T1 = [false, false, false, false]
type T1 = Fill<[3, 3, 3, 3], false>

export {};
