const Multi = (value: any) => ({
  value,
  concat: (box: any) => Multi(value * box.value),
});
Multi.empty = () => Multi(1);

const arr = [1, 2, 3, 4];

const res1 = arr.reduce(
  (monoid, value) => monoid.concat(Multi(value)),
  Multi.empty()
);
const res2 = arr
  .map((value) => Multi(value))
  .reduce(
    (prevMonoid, currentMonoid) => prevMonoid.concat(currentMonoid),
    Multi.empty()
  );

console.log(res1.value); // 24
console.log(res2.value); // 24

const flodMap = (Monoid: any, arr: any[]): any =>
  arr
    .map(Monoid)
    .reduce(
      (prevMonoid, currentMonoid) =>
        (prevMonoid as any)?.concat?.(currentMonoid),
      Monoid.empty()
    );

const res = flodMap(Multi, [1, 2, 3, 4]);

console.log(res.value); // 24

const compose =
  (...fns: Function[]) =>
  (initialValue: any) =>
    fns.reduceRight((prev, cur) => cur(prev), initialValue);

const CompositionMonoid = (value: any) => ({
  value,
  concat: (fnMonoid: any) =>
    CompositionMonoid((v: any) => value(fnMonoid.value(v))),
});
CompositionMonoid.empty = () => CompositionMonoid((value: any) => value);

const composeMonoid = (...fns: any[]) => flodMap(CompositionMonoid, fns).value;

const add = (x: number) => x + 1;
const divide = (x: number) => x / 2;
const multiply = (x: number) => x * 3;
const res11 = compose(divide, multiply, add)(10);
const res22 = composeMonoid(divide, multiply, add)(10);

console.log(res11); // 16.5
console.log(res11 === res22); //  true

export {};
