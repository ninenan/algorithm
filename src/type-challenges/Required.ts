// Required<Types>
// 用于构造一个Type下面的所有属性全都设置为必填的类型，这个工具类型跟 Partial (opens new window)相反。

interface IPerson {
  name: string;
  age?: number;
}

const person: Required<IPerson> = {
  name: 'nnn',
  age: 18
}

type MyRequired<T> = {
  [K in keyof T]-?: T[K];
} 

const person1: MyRequired<IPerson> = {
  name: 'nnn1',
  age: 18
}

export {}
