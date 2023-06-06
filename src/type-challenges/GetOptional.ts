type OptionalKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T];

type GetOptional<T> = {
  [K in OptionalKeys<T>]?: T[K];
};

interface IPerson {
  name: string;
  age: number;
  sex: number;
  height?: number;
}

type T1 = GetOptional<IPerson>;

const val: T1 = {
  // height: undefined,
  // height: 180,
};

console.log(val);
export {};
