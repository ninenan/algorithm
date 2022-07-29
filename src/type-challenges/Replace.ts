// Replace<StringTypes, StringTypes, StringTypes// Replace<StringTypes, StringTypes, StringTypes>
// Replace是用来将字符串中第一次出现的某段内容，使用指定的字符串进行替换

type Replace<
  T extends string,
  U extends string,
  R extends string
> = T extends `${infer K}${U}${infer S}`
  ? U extends ""
    ? T
    : `${K}${R}${S}`
  : T;

// T1 = helloreactworld
type T1 = Replace<"helloworldworld", "world", "react">;
// T2 = vueworldworld
type T2 = Replace<"helloworldworld", "hello", "vue">;

const str: T1 = "helloreactworld";
const str2: T2 = "vueworldworld";

export {};
