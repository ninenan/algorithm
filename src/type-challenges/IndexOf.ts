// IndexOf<Types, Types>
// 模拟实现 indexOf

type IndexOf<
  T extends any[],
  N extends number,
  R extends any[] = []
> = T extends [infer S, ...infer Rest]
  ? S extends N
    ? R["length"]
    : IndexOf<Rest, N, [...R, S]>
  : -1;

// Res = 1
type Res = IndexOf<[1, 2, 3], 2>;
// Res1 = 2
type Res1 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>;
// REs2 = -1
type Res2 = IndexOf<[0, 0, 0], 2>;

export {};
