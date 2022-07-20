// Omit<Type, Keys>
// 用于构造一个类型，它是从Type类型里面过滤了一些属性Keys(Keys是字符串字面量 或者 字符串字面量的联合类型)

interface IPerson {
  name: string;
  age: number;
  height: number;
  sex: boolean;
}

type T1 = Omit<IPerson, "age">;

const person1: T1 = {
  name: "n1",
  height: 180,
  sex: false,
};

type T2 = Omit<IPerson, "age" | "sex">;

const person2: T2 = {
  name: "n2",
  height: 180,
};

type MyExclude<T, U> = T extends U ? never : T;
type MyPick<T, U extends keyof T> = {
  [K in U]: T[K];
};

// 实现
type MyOmit<T, U extends string | number | symbol> = MyPick<T, MyExclude<keyof T, U>>;

type T3 = MyOmit<IPerson, "age">;

const person3: T3 = {
  name: "n3",
  height: 180,
  sex: false,
};

type T4 = MyOmit<IPerson, "age" | "sex">;

const person4: T4 = {
  name: "n4",
  height: 180,
};

export {};
