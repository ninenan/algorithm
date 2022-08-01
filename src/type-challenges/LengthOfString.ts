// LengthOfString<StringTypes>
// 计算字符串的长度

// 核心点是通过转换成数组，通过数组的 length 来获取到对应的长度
// 如果是 LengthOfString<'world'>
// LengthOfString<U, [...T, R]>
// R 是提取到的首位字符，T 是上次的数组, U 是将要处理的字符
type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer R}${infer U}`
  ? LengthOfString<U, [...T, R]>
  : T["length"];

// step1
// U = 'orld' R = 'w' T = ['w']
// step2
// U = 'rld' R = 'o' T = ['wo']
// step3
// U = 'ld' R = 'r' T = ['wor']
// step4
// U = 'd' R = 'l' T = ['worl']
// step5
// U = '' R = 'd' T = ['world']
// T1 = 5
type T1 = LengthOfString<"world">;

export {}
