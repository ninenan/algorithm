// LastIndexOf<Types, Types>
// 模拟实现 Array.LastIndexOf

type Pop<T extends any[]> = T extends [...infer Rest, any] ? Rest : [];

type LastIndexOf<
  T extends any[],
  K extends number,
  R extends any[] = Pop<T>
> = T extends [...infer Rest, infer L]
  ? L extends K
    ? R["length"]
    : LastIndexOf<Rest, K>
  : -1;

// Res1 = 3
type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2>
// Res2 = -1
type Res2 = LastIndexOf<[0, 0, 0], 2>

export {};
