// BEM<Types, K, U>
// 将字符串拼接成 BEM 格式

type ArrToStr<S extends string, T extends string[] = []> = T extends []
  ? ""
  : `${S}${T[number]}`;

// "aaa" | "bbb"
type Unio = ["aaa", "bbb"][number];

type BEM<
  B extends string,
  E extends string[] = [],
  M extends string[] = []
> = `${B}${ArrToStr<"__", E>}${ArrToStr<"--", M>}`;

// 推荐使用上面的 BEM 类型
type MyBEM<
  B extends string,
  E extends string[] = [],
  M extends string[] = []
> = `${B}__${E[number]}${M extends [] ? "" : `--${M[number]}`}`;

// T1 = 'btn__price--small' | 'btn__price--mini'
type T1 = BEM<"btn", ["price"], ["small", "mini"]>;
// T11 = 'btn__price--small' | 'btn__price--mini'
type T11 = MyBEM<"btn", ["price"], ["small", "mini"]>;
// T2 = 'btn__price' | 'btn__default'
type T2 = BEM<"btn", ["price", "default"]>;
// T22 = 'btn__price' | 'btn__default'
type T22 = MyBEM<"btn", ["price", "default"]>;

export {};
