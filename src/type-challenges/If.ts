// IF<Types, Types, Types>
// If<T, U, R> T 为 true 则返回 U，否则返回 R

type If<T extends boolean, U, R> = T extends true ? U : R;

// T1 = 'a'
type T1 = If<true, "a", "b">;
// T2 = 2
type T2 = If<false, 1, 2>;

type Data<T = unknown> = T & {
  value: string;
};

type Res = { name: string } & { age: number; name: number }; // 这里的 name 属性将会返回 never

const res: Res = {
  number: 18,
};
console.log(res);
export {};
