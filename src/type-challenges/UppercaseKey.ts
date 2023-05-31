type UppercaseKey<T extends object> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

type T1 = UppercaseKey<{
  name: "nnn";
  sex: false;
}>;

const obj: T1 = {
  NAME: "nnn",
  SEX: false,
};

export {};
