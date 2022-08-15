// RequiredByKeys<T, K>
// 实现一个通用的RequiredByKeys<T, K>，它接收两个类型参数T和K。
// K指定应设为必选的T的属性集。当没有提供K时，它就和普通的Required<T>一样使所有的属性成为必选的。

type Copy<T> = {
  [K in keyof T]: T[K]
}

type RequiredByKeys<T, K extends keyof T> = Copy<Required<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>

interface User {
  name?: string
  age?: number
  address?: string
}

//  UserRequiredName = { name: string; age?: number; address?: string }
type UserRequiredName = RequiredByKeys<User, 'name'> 

const obj: UserRequiredName = {
  name: 'nnn'
}

export {};
