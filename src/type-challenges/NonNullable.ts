// NonNullable<Types>
// 用于构造一个类型，这个类型从Type中排除了所有的null、undefined的类型。

type T1 = NonNullable<string | number | null | undefined>;

type MyNonNullable<T> = T extends null | undefined ? never : T;

type T2 = MyNonNullable<string | number | null | undefined>;
