// IsTuple<Types>
// 判断是否是元祖类型

type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;

// case1 = true
type case1 = IsTuple<[number]>;
// case2 = true
type case2 = IsTuple<readonly [number]>;
// case3 = false
type case3 = IsTuple<number[]>;

export {};
