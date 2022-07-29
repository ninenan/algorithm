// ReplaceAll<StringTypes, StringTypes, StringTypes>
// ReplaceAll是用来将字符串中指定字符全部替换

type ReplaceAll<
  S extends string,
  T extends string,
  U extends string
> = S extends `${infer L}${T}${infer R}`
  ? T extends ""
    ? S
    : `${ReplaceAll<L, T, U>}${U}${ReplaceAll<R, T, U>}`
  : S;

// worldworldworld
type T1 = ReplaceAll<'hellohellohello', 'hello', 'world'>

const str:T1 = 'worldworldworld';

export {}
