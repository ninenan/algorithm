// Includes<Types, Types>
// Includes<T, U> 用来判断 U 是否在数组 T 中，类似实现数组的 includes 方法

type Includes<T extends any[], U> = U extends T[number] ? true : false;

type Equal<X, Y> = <T>() => T extends X
  ? 1
  : 2 extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

type MyIncludes<T extends any[], U> = T extends [infer R, ...infer L]
  ? Equal<R, U> extends true
    ? true
    : MyIncludes<L, U>
  : false;

// T1 = false
type T1 = Includes<[1, 2, 3], 4>;
// T2 = true
type T2 = Includes<[1, 2, 3], 2>;

export {};
