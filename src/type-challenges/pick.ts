// 模拟实现 Pick

interface IPerson {
  name: string;
  sex: 1 | 2 | 0;
  height: number
}

const person1:Pick<IPerson, 'name' | 'height'> = {
  name: 'nnn',
  height: 180
}

// keyof 取出 T 类型中的 key
// 所以 keyof T = name | sex | height
// extends 对泛型进行约束
// 'name' | 'height' 是 'name' | 'sex' | 'height' 子集
// in 遍历
// [P in K] 表示遍历 K ，将其类型赋值给 P
// T[P] 表示获取 T 中对应 key 的值
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

const person2:MyPick<IPerson, 'name' | 'height'> = {
  name: 'nnn2',
  height: 181
}

export {}
