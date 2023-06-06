type OptionalKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K;
}[keyof T];

interface IPerson {
  name: string;
  age: number;
  sex: number;
  height?: number;
}

// height | undefined
type T1 = OptionalKeys<IPerson>;

const val: T1 = "height";

console.log(val);
export {};
