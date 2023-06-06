// IsUnion<Types>
// 实现一个类型 IsUnion，该类型接受输入类型 T 并返回 T 是否解析为联合类型。

// IsUnion<string | number>
// (string extends string | number ? (string extends number ? true : false) | (string extends string ? true : false) : never)
// (number extends string | number ? (number extends number ? true : false) | (number extends string ? true : false) : never)
type IsUnion<T, F = T> = (
  T extends F ? (F extends T ? true : false) : never
) extends true
  ? false
  : true;

type IsUnion2<A, B = A> = A extends A
  ? [B] extends [A]
    ? false
    : true
  : never;

// true
type Tc1 = [never] extends [never] ? true : false;
// false
type Tc2 = [Exclude<string | number, string | number>] extends [never]
  ? false
  : true;
// true
type Tc3 = string | number extends string | number ? true : false;

// T1 = false
type T1 = IsUnion<string>;
// T2 = true
type T2 = IsUnion<string | number>;
// T3 = false
type T3 = IsUnion<[string | number]>;

// T11 = false
type T11 = IsUnion2<string>;
// T22 = true
type T22 = IsUnion2<string | number>;
// T33 = false
type T33 = IsUnion2<[string | number]>;

export {};
