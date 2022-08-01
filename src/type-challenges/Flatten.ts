// Flatten<ArrayTypes>
// 返回扁平化数组之后的数组类型

type Flatten<T extends any[]> = T extends [infer R, ...infer U]
  ? R extends any[]
    ? [...Flatten<R>, ...Flatten<U>]
    : [R, ...Flatten<U>]
  : [];

type T1 = Flatten<[1, 2, [3, 4, [5, 6, 8]]]>;

export {}
