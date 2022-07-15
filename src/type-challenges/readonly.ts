// 模拟实现 Readonly

interface IPerson {
  name: string;
  height: number;
  sex: boolean
}

const person1: Readonly<IPerson> = {
  name: 'nnn1',
  height: 180,
  sex: false
}

// person1.name = 'nnn3' // 无法分配到 "name" ，因为它是只读属性。

// readonly 对属性做只读属性的操作
// K in keyof T
// 获取 T 类型中的 key
// T[K]
// 获取 T 中的对应 key 的值
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

const person2: Readonly<IPerson> = {
  name: 'nnn2',
  height: 181,
  sex: true
}

// person2.name = 'nnn4' // 无法分配到 "name" ，因为它是只读属性。
