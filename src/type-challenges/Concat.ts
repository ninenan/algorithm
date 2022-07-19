// Concat<Types, Types>
// Concat<T, U> 将两个数组合并起来

type Concat<T extends any[], U extends any[]> = [...T, ...U]

// T1 返回的类型是 [1, 2, 3, 4]
type T1 = Concat<[1, 2], [3, 4]>

const arr: T1 = [1, 2, 3, 4]

export {}
