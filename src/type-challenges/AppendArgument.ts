// AppendArgument<Types, Types// AppendArgument<Types, Types>
// AppendArgument用来向一个函数追加一个参数

type AppendArgument<T extends (...args: any[]) => any, U> = T extends (
  ...args: infer R
) => infer S
  ? (...args: [...R, U]) => S
  : never;

type T1 = AppendArgument<(a: number) => number, number>;

const fn: T1 = (a, b) => {
  return a + b;
};

fn(2, 3);

export {};
