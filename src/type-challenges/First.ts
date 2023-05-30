// First 返回数组的的第一个元素

// T extends any[] 约束 T 的类型是数组
// T extends [] 判断 T 是否是空数组
type First<T extends any[]> = T extends [] ? never : T[0];

// infer R 表示数组的第一个元素
// infer L 表示数组剩余的元素
type First1<T extends any[]> = T extends [infer R, ...unknown[]] ? R : never;

// 3
type result1 = First<[3, 2, 1]>;
type result3 = First1<[3, 2, 1]>;

// never
type result2 = First<[]>;
type result4 = First1<[]>;

export {};
