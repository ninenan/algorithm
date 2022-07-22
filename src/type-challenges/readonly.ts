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

// U extends keyof T = keyof T
// 如果传递了 U，那么 U 只能是 T 中存在的属性，不存在就报错
// 如果 U 没有传，那么就默认是全部
// T & { readonly [K in U]: T[K] }
// 将 T 类型和后面的类型结合起来，否则会丢失 T 中的类型
type MyReadonly2<T, U extends keyof T = keyof T> = T & {
  readonly [K in U]: T[K]
}

// 用这个
type MyReadonly3<T, U extends keyof T = keyof T> = Omit<T, U> & {
  readonly [K in U]: T[K]
}

const person2: MyReadonly<IPerson> = {
  name: 'nnn2',
  height: 181,
  sex: true
}

const p3: MyReadonly3<IPerson, 'name'> = {
  name: 'p3',
  height: 182,
  sex: false,
}

// p3.height = 'p4'; // 无法分配到 "name" ，因为它是只读属性。
// person2.name = 'nnn4'; // 无法分配到 "name" ，因为它是只读属性。

export {}
