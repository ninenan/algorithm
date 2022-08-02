// IF<Types, Types, Types>
// If<T, U, R> T 为 true 则返回 U，否则返回 R

type If<T extends boolean, U, R> = T extends true ? U : R;

// 'a'
type T1 = If<true, "a", "b">;
// 2
type T2 = If<false, 1, 2>;

export {};