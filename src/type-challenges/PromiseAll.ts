// PromiseAll是用来取Promise.all()函数所有返回的类型，声明的是一个 function，不是一个 type

type PromiseAllType<T> = Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K]
}>

declare function PromiseAll<T extends any[]>(values: readonly [...T]): PromiseAllType<T>

const fn = () => Promise.all([1, 2, Promise.resolve('3')])
type T1 = ReturnType<typeof fn>

type T2 = typeof PromiseAll([1, 2, Promise.resolve('3')]);

export {}

