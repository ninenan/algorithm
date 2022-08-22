// BEM<Types, K, U>
// 将字符串拼接成 BEM 格式

type ArrToStr<S extends string, T extends string[] = []> = T extends []
  ? ""
  : `${S}${T[number]}`;

type BEM<
  B extends string,
  E extends string[] = [],
  M extends string[] = []
> = `${B}${ArrToStr<"__", E>}${ArrToStr<"--", M>}`;

// T1 = 'btn--price__small' | 'btn--price__mini'
type T1 = BEM<"btn", ["price"], ["small", "mini"]>;
// T2 = 'btn--price' | 'btn--default'
type T2 = BEM<"btn", ["price", "default"]>;

export {};
