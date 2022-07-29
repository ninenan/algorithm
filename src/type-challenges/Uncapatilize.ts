// Uncapatilize<StringTypes>
// 首字母小写

type Uncapatilize<T> = T extends `${infer R}${infer L}` ? `${Lowercase<R>}${L}` : T;

// T1 = hello
type T1 = Uncapatilize<'Hello'>

const str: T1 = 'hello'


export {}
