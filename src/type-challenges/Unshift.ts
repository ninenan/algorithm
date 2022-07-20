// Unshift<Types, Types>

type Unshift<T extends any[], K> = [K, ...T]

const arr: Unshift<[1, 2, 3], 4> = [4, 1, 2, 3];

export {}
