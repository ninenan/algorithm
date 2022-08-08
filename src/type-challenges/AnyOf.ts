// AnyOf<ArrayTypes>
// 类型接收一个数组，如果数组中任一个元素为真，则返回 true，否则返回 false。如果数组为空，返回 false。

type FalseType = '' | [] | { [key: string]: never; } | false | 0;
type AnyOf<T extends readonly any[]> = T[number] extends FalseType ? false : true;

// T1 = true
type T1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
// T2 = false
type T2 = AnyOf<[0, '', false, [], {}]> // expected to be false.

export {}
