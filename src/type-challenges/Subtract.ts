type CreateTrupple<T extends number, S extends 1[] = []> = S["length"] extends T
  ? S
  : CreateTrupple<T, [...S, 1]>;

type Subtract<
  N1 extends number,
  N2 extends number
> = CreateTrupple<N1> extends [...arr1: CreateTrupple<N2>, ...arr2: infer R]
  ? R["length"]
  : never;

const num: Subtract<100, 20> = 80;

console.log(num);
export {};
