// Shift<Types>

type Shift<T extends any[]> = T extends [infer R, ...infer U] ? U : never;

// arr 返回的类型是 [2, 3]
const arr: Shift<[1, 2, 3]> = [2, 3];

export {}
