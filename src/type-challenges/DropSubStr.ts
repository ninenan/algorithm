type DropSubStr<
  S extends string,
  K extends string
> = S extends `${infer R}${K}${infer T}` ? DropSubStr<`${R}${T}`, K> : S;

const str: DropSubStr<"helloworld", "world"> = "hello";

export {};
