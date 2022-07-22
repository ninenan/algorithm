// Last<Types>
// Last是用来获取数组中最后一个元素

type Last<T extends any[]> = T extends [...infer R, infer U] ? U : never;
// [any, ...T][T['length']]
// [any, ...T] 这里构建了一个新的数组，把 any 添加到原始数组的首位
// T['length'] 这里的 length 获取到的是原始数组的长度，例如 [1, 2, 3]，这里的 length 就是 3
// 但是因为新的数组比原数组多添加了一个首位，所以 3 刚好对应原数组的最后一位的索引
type Last2<T extends any[]> = [any, ...T][T['length']];

// T1 = 3
type T1 = Last<[1, 2, 3]>
// T2 = never
type T2 = Last<[]>
// T3 = 2
type T3 = Last<[2]>

export {}
