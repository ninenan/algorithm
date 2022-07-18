// Length 返回数组（类数组）的长度

// T extends { length: number } 约束 T 的类型是 { length: number } 的子类
type Length<T extends any> = T extends {length: number} ? T['length'] : never;

// 5
type res1 = Length<[1, 2, 3, 4, 5]>
// 10
type res2 = Length<{length: 10}>
