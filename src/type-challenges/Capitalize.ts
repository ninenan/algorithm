// Capitalize<StringType>
// 将字符串的第一个字母转换为大写，其余的保持原样。

type Greeting = 'hello world';
// ShoutGreeting = "HELLO WORLD"
type ShoutGreeting = Uppercase<Greeting>;

// infer R
// 获取第一个字符
type Capitalize<T> = T extends `${infer R}${infer L}` ? `${Uppercase<R>}${L}` : T

// T1 = "Hello world"
type T1 = Capitalize<Greeting>;

export {}
