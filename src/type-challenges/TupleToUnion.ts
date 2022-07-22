// TupleToUnion<Types>
// TupleToUnion是用来将一个元组转换成联合类型

type TupleToUnion<T extends any[]> = T[number];
type TupleToUnion2<T extends any[]> = T extends [infer R, ...infer args] ? 
  R | TupleToUnion2<args> 
  : never;

// T1 = 1 | 2 | 3
type T1 = TupleToUnion<[1, 2, 3]>;
type T2 = TupleToUnion2<[1, 2, 3]>;

export {}
