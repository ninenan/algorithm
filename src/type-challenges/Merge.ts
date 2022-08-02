// Merge<Types, Types>
// 将两个类型合并成一个类型，第二个类型的键会覆盖第一个类型的键。

type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

type foo = {
  name: string;
  age: string;
};

type coo = {
  age: number;
  sex: string;
};

// Result = {name: string, age: number, sex: string}
type Result = Merge<foo, coo>;

export {};

