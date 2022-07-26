// Capitalize<StringType>
// Converts each character in the string to the uppercase version.

type Greeting = 'hello world';
// ShoutGreeting = "HELLO WORLD"
type ShoutGreeting = Uppercase<Greeting>;

type Capitalize<T> = T extends `${infer R}${infer L}` ? `${Uppercase<R>}${L}` : T

// T1 = "Hello world"
type T1 = Capitalize<Greeting>;

export {}
