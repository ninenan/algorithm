type RequiredKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? K : never;
}[keyof T];

type GetRequired<T> = {
  [K in RequiredKeys<T>]: T[K];
};

interface IPerson {
  name: string;
  age: number;
  sex: number;
  height?: number;
}

const obj: GetRequired<IPerson> = {
  name: "nnn",
  age: 18,
  sex: 1,
};

console.log(obj);
export {};
