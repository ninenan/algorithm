// Trim<StringType>
// 移除字符串首尾空格

type TS = " " | "\n" | "\t";
type Trim<T extends string> = T extends `${TS}${infer R}` | `${infer R}${TS}`
  ? Trim<R>
  : T;
// T1 = 123
type T1 = Trim<"   123 ">;

// TrimStart
// 移除字符串首位空格
type TrimStart<T extends string> = T extends `${TS}${infer R}`
  ? TrimStart<R>
  : T;
// T2 = 1231231
type T2 = TrimStart<"   1231231">;

// TrimEnd
// 移除字符串尾巴空格
type TrimEnd<T extends string> = T extends `${infer R}${TS}` ? TrimEnd<R> : T;
// T3 = 2222
type T3 = TrimEnd<"2222   ">;

export {};
