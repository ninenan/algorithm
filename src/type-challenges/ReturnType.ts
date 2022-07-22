// ReturnType<Type>
// 用于构造一个含有Type函数的返回值的类型。

// T1 = string
type T1 = ReturnType<() => string>

// T2 = void
type T2 = ReturnType<(s: string) => void>

type MyReturnType<T extends (...args: any) => any> = T extends (...arg: any) => infer R ? R : any;

// T3 = void
type T3 = MyReturnType<(s: string) => void>
// T4 = string
type T4 = MyReturnType<() => string>
// T5 = number
type T5 = MyReturnType<() => number>
// T6 = number[]
type T6 = MyReturnType<<T extends U, U extends number[]>() => T>

export {}
