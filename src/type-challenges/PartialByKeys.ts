// PartialByKeys<T, K>
// 实现一个通用的 PartialByKeys<T, K>，它接收两个类型参数 T 和 K。
// K 指定应设置为可选的 T 的属性集。当没有提供 K 时，它就和普通的 Partial<T> 一样使所有属性都是可选的。

type Copy<T> = {
  [K in keyof T]: T[K]
}
type PartialByKeys<T, K extends keyof T = keyof T> = Copy<Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>

interface User {
  name: string
  age: number
  address: string
}

type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
type UserPartialName2 = PartialByKeys<User, 'name' | 'address'> // { name?:string; age:number; address:string }

const obj: UserPartialName = {
  age: 18,
  address: 'address'
}

const obj2: UserPartialName2 = {
  age: 18
}

export {}
