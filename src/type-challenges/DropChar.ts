// DropChar<StringTypes, StringTypes>
// 从字符串中删除指定的字符。

type DropChar<T extends string, S extends string> = S extends ""
  ? T
  : T extends `${infer R}${S}${infer U}`
  ? `${DropChar<`${R}${U}`, S>}`
  : T;

// T1 = 'heoword'
type T1 = DropChar<'helloworld', 'l'>
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'

const str: Butterfly = 'butterfly!';
const str1: T1 = 'heoword';

export {};
