// KebabCase<StringTypes>
// FooBarBaz -> foo-bar-baz

type KebabCase<T extends string> = T extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${S1}-${KebabCase<S2>}`
  : T;

// T1 = foo-bar-ts
type T1 = KebabCase<'FooBarTs'>
// T2 = hello-world
type T2 = KebabCase<'HelloWorld'>

export {}
