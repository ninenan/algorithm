// Diff<Types, Types>
// 获取两个接口类型中的差值属性。

// keyof (T & U)
// 获取 T 和 U 的联合类型
// keyof (T | U)
// 获取 T 和 U 的公共属性
type DiffKey<T, U> = Exclude<keyof (T & U), keyof(T | U)>;
type Diff<T, U> = {
  [K in DiffKey<T, U>]: K extends keyof T ? T[K] : K extends keyof U ? U[K] : never;
}

type Diff2<T, U> = Omit<T & U, keyof T & keyof U>

type Foo = {
  a: string;
  b: number;
}

type Bar = {
  a: string;
  c: boolean;
}

// T1 = { b: number, c: boolean }
type T1 = Diff<Foo, Bar>
// T2 = { b: number, c: boolean }
type T2 = Diff2<Bar, Foo>

export {}
