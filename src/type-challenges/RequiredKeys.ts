type RequiredKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? K : never;
}[keyof T];

interface IPerson {
  name: string;
  age: number;
  sex: number;
  height?: number;
}

// name | age | sex
type T1 = RequiredKeys<IPerson>;

// 第一步 P = 'name'
// T extends { name: string; } => 'name'
// 第二步 p = 'age'
// T extends { age: number; } => 'age'
// 第三步 p = 'sex'
// T extends { sex: number; } => 'sex'
// 第四步 p = 'height'
// T extends { height?: number; } => never

// 上述步骤得到的最新类型
// type TNew = {
//   name: string;
//   age: string;
//   sex: string;
//   height: never
// }

// false
type T2 = { name: string; age: number; sex?: boolean } extends Record<
  "sex",
  boolean
>
  ? true
  : false;

const val: T1 = "name";

export {};
