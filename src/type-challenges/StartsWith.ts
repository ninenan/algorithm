// StartsWith<StringTypes, stringTypes>
// 实现 StartsWith < T，U > ，它接受两个精确的字符串类型，并返回 T 是否以 U 开头

type StartsWith<T extends string, U extends string> = T extends `${U}${infer S}` ? true : false;

// T1 = true
type T1 = StartsWith<'hello', 'he'>
// a = false
type T2 = StartsWith<'abc', 'ac'>
// T3 = true
type T3 = StartsWith<'abc', 'ab'>
// T4 = false
type T4 = StartsWith<'abc', 'abcd'>

export {};
