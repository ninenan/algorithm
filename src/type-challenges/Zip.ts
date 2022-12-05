// Zip<Types, Types>
// 元祖转换为数组

type Zip<T extends readonly any[], U extends readonly any[]> = T extends [
  infer R,
  ...infer S
]
  ? U extends [infer K, ...infer Y]
    ? [[R, K], ...Zip<S, Y>]
    : []
  : [];

type exp = Zip<[1, 2], [true, false]>; // expected to be [[1, true], [2, false]]
