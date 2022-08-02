// Absolute<Types>
// 数字转换成正整数字符串

type Absolute<T extends number> = `${T}` extends `-${infer N}` ? N : `${T}`;

type T1 = Absolute<-1000>
type T2 = Absolute<200>

const num1: T1 = '1000'
const num2: T2 = '200'

export {}
