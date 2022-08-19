// TupleToNestedObject<T, U>
// 给定一个只包含字符串类型的元组类型 T 和一个类型 U，递归地构建一个对象。

type TupleToNestedObject<T extends any[], U> = T extends [infer F, ...infer R]
  ? F extends string
    ? { [P in F]: TupleToNestedObject<R, U> }
    : never
  : U;

// a = {a: string}
type a = TupleToNestedObject<['a'], string>
// b = {a: {b: number}}
type b = TupleToNestedObject<['a', 'b'], number>
// c = boolean
// if the tuple is empty, just return the U type
type c = TupleToNestedObject<[], boolean>
// d = {a: {b: c: {number}}}
type d = TupleToNestedObject<['a', 'b', 'c'], number>

export {}
