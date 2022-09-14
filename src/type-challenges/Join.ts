// Join<Types, Types>
// 实现类似的 Array.join()

type Join<
  T extends any[],
  S extends string | number,
  U extends string = ""
> = T extends [infer K, ...infer Rest]
  ? Rest["length"] extends 0
    ? `${U extends "" ? "" : `${U}${S}`}${K & string}`
    : Join<Rest, S, `${U extends "" ? "" : `${U}${S}`}${K & string}`>
  : U;

// Res = 'a-p-p-l-e'
type Res = Join<["a", "p", "p", "l", "e"], "-">;
// Res1 = 'Hello World'
type Res1 = Join<["Hello", "World"], " ">;
// Res2 = '21212'
type Res2 = Join<["2", "2", "2"], 1>;
// Res3 = 'o'
type Res3 = Join<["o"], "u">;

export {};

