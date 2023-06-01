type ReverseStr<S extends string> = S extends `${infer T}${infer D}`
  ? T | ReverseStr<D>
  : never;

type T1 = ReverseStr<"hello">;

const str: T1 = "l";

console.log(str);

export {};
