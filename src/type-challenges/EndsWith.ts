// EndsWith<StringTypes, StringTypes>
// 实现 EndsWith < T，U > ，它接受两个精确的字符串类型，并返回 T 是否以 U 结尾

type EndsWith<T extends string, U extends string> = T extends `${infer S}${U}` ? true : false;

// T1 = true
type T1 = EndsWith<'abc', 'bc'>
// T2=  true
type T2 = EndsWith<'abc', 'abc'>
// T3 = false
type T3 = EndsWith<'abc', 'd'>

export {};
