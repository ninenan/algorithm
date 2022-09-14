// Trunc<Types>
// 取整

type Trunc<T extends string | number> = `${T}` extends `${infer S}.${string}` ? S : T;

// A = '12'
type A = Trunc<12.34>
// B = '-12'
type B = Trunc<-12.34>
// T1 = 123123
type T1 = Trunc<123123>

export {}
