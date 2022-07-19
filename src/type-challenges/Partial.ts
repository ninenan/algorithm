// Partial<Types>
// 用于构造一个Type下面的所有属性都设置为可选的类型，这个工具类型会返回代表给定的一个类型的子集的类型。

interface IPerson {
  name: string;
  age: number;
}

// person1 的类型是 { name?: string; age?: number }
const person1:Partial<IPerson> = {
  name: 'nnn'
}

type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

const person2:MyPartial<IPerson> = {
  name: 'nnn1',
  age: 180,
}

export {}
