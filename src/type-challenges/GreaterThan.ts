// GreaterThan<T, U>
// 比较前后数字大小

type GreaterThan<
  T extends number,
  U extends number,
  R extends number[] = []
> = T extends R["length"]
  ? false
  : U extends R["length"]
  ? true
  : GreaterThan<T, U, [...R, 0]>;

// T1 = true
type T1 = GreaterThan<2, 1>;
// T2 = false
type T2 = GreaterThan<1, 1>;
// T3 = false
type T3 = GreaterThan<10, 100>;
// T4 = true
type T4 = GreaterThan<111, 11>;

export {};
