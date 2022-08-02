// StringToArray<StringTypes>
// 字符串转换为数组

type StringToArray<T extends string, X extends any[] = []> = T extends `${infer R}${infer S}` ? StringToArray<S, [...X, R]> : X;

type T1 = StringToArray<'hello'>

const arr: T1 = ['h', 'e', 'l', 'l', 'o'];

export {}
