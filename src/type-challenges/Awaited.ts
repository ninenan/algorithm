// Awaited<Types>
// 获取 Promise<T> 中的 T 类型

type Awaited<T extends Promise<any>> = T extends Promise<infer R> ? R extends Promise<any> ? Awaited<R> : R : never;

// T1 = string | number
type T1 = Awaited<Promise<string>>

export {}
