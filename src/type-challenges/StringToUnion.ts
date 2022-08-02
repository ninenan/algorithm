// StringToUnion<SringTypes>
// 实现一个将接收到的String参数转换为一个字母Union的类型。

type StringToUnion<T extends string> = T extends `${infer S}${infer U}` ? S | StringToUnion<U> : never;

// T1 = '1' | '2' | '3'
type T1 = StringToUnion<'123'>

const str: T1 = '3';

export {}
