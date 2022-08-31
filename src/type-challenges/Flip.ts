// type Flip<T>
// 对象键值交换

type Flip<T extends Record<string, string | number | boolean>> = {
  [K in keyof T as `${T[K]}`] : K;
};

// T1 = {x: 'a', y: 'b', z: 'c'}
type T1 = Flip<{ a: "x", b: "y", c: "z" }>;
// T2 = {1: 'a', 2: 'b', 3: 'c'}
type T2 = Flip<{ a: 1, b: 2, c: 3 }>;
// T3 = {false: 'a', true: 'b'}
type T3 = Flip<{ a: false, b: true }>;

export {};
