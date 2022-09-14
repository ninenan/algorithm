// Chunk<Types, NumberType>
// 模仿 lodash.Chunk 分割数组

type Chunk<
  T extends any[],
  Size extends number,
  R extends any[] = []
> = R["length"] extends Size
  ? [R, ...Chunk<T, Size>]
  : T extends [infer F, ...infer L]
  ? Chunk<L, Size, [...R, F]>
  : R["length"] extends 0
  ? []
  : [R];

// exp1 = [[1, 2], [3]]
type exp1 = Chunk<[1, 2, 3], 2>
// exp2 = [[1, 2, 3]]
type exp2 = Chunk<[1, 2, 3], 4>
// exp3 = [[1], [2], [3]]
type exp3 = Chunk<[1, 2, 3], 1>

export {};
