// Extract<Type, Union>
// 用于构造一个类型，它是从Type类型里面提取了所有可以赋给Union的类型。

// T1 返回的类型是 'c'
type T1 = Extract<'a' | 'b' | 'c', 'c' |' d'>
// T2 返回的类型是 () => void
type T2 = Extract<string | number | (() => void), Function>

type MyExtract<T, U> = T extends U ? T : never;

// T3 返回类型 c
type T3 = MyExtract<'a' | 'b' | 'c', 'c' |' d'>
// T4 返回类型 () => void
type T4 = MyExtract<string | number | (() => void), Function>

export {}
