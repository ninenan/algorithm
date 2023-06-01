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

type MyReplaceAll<
  S extends string,
  F extends string,
  T extends string
> = S extends `${infer L}${F}${infer R}`
  ? `${L}${T}${MyReplaceAll<R, F, T>}`
  : S;

// worldworldworld
type T1 = ReplaceAll<"hellohellohello", "hello", "world">;
type T2 = MyReplaceAll<"helloVueReact", "Vue", "Node">;

const str1: T1 = "worldworldworld";
const str2: T2 = "helloNodeReact";

export {};
