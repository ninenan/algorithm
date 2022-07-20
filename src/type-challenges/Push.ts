// Push<Types, Types>

type Push<T extends any[], K> = [...T, K];

// arr 返回的类型是 [1, 2, 3, 4]
const arr: Push<[1, 2, 3], 4> = [1, 2, 3, 4];

export {}
