// RemoveIndexSignature<Types>
// 实现 RemoveIndexSignature < T > ，从对象类型中排除索引签名。

type NeverKey<T> = string extends T ? never : number extends T ? never : symbol extends T ? never : T;

type RemoveIndexSignature<T> = {
  [K in keyof T as NeverKey<T>]: T[K]
}

// T1 = 1
type T1 = string extends keyof {
  [key: string]: any
} ? 1: 2

// T2 = 2
type T2 = string extends keyof {
  foo: any
} ? 1: 2

// T3 = 1
type T3 = keyof {
  foo: any
} extends string ? 1: 2

export {};
