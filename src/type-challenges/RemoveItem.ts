type IsEqual<T, R> = (T extends R ? true : false) &
  (R extends T ? true : false);

type RemoveItem<T extends unknown[], I, D extends unknown[] = []> = T extends [
  infer F,
  ...infer R
]
  ? IsEqual<F, I> extends true
    ? RemoveItem<R, I, D>
    : RemoveItem<R, I, [...D, F]>
  : D;

type T1 = RemoveItem<[1, 2, 3, 4, 2], 2>;

const arr: T1 = [1, 3, 4];

console.log(arr);

export {};
