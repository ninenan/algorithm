// FlattenDepth<T, U>
// 根据 U 值递归地将数组扁平化

type FlattenDepth<
  T extends any[],
  U extends number = 1,
  S extends any[] = []
> = T extends [infer F, ...infer R]
  ? S["length"] extends U
    ? T
    : F extends any[]
    ? [...FlattenDepth<F, U, [0, ...S]>, ...FlattenDepth<R, U>]
    : [F, ...FlattenDepth<R, U, S>]
  : T;

// a = [1, 2, 3, 4, [5]]. flattern 2 times
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>
// b = [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>

export {};
