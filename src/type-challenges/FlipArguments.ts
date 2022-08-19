// FlipArguments<Types>
// 类型 FlipArguments < T > 要求函数类型 T，并返回一个新的函数类型，该函数类型具有相同的 T 返回类型，但参数是相反的。

type Reverse<T extends any[]> = T extends [...infer R, infer U]
  ? [U, ...Reverse<R>]
  : [];

type FlipArguments<T extends (...args: any[]) => any> = T extends (
  ...args: infer A
) => infer R
  ? (...args: Reverse<A>) => R
  : never;

// Flipped = (arg0: boolean, arg1: number, arg2: string) => void
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 

export {};
