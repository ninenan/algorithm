// Exclude<UnionType, ExcludedMembers>
// 用于构造一个类型，它是从UnionType联合类型里面排除了所有可以赋给ExcludedMembers的类型。

// T1 返回的类型是 'name' | 'sex'
type T1 = Exclude<'name' | 'sex' | 'age', 'sex' | 'address'>;
// T2 返回的类型是 string | number
type T2 = Exclude<string | number | (() => void), Function>;

// T extends U
// 'a' | 'b' | 'c' extends 'c' | 'd'
// 'a' extends 'c' | 'd' ? never : 'a'
// 'b' extends 'c' | 'd' ? never : 'b'
// 'c' extends 'c' | 'd' ? never : 'c'
// 因此最后返回 'a' | 'b'
type MyExclude<T, U> = T extends U ? never : T;

// T3 类型是 'a' | 'b'
type T3 = MyExclude<'a' | 'b' | 'c', 'c' | 'd'>;
// T4 类型是 string
type T4 = MyExclude<string | number, number>;

export {};
