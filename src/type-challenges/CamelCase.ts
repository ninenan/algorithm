// CamelCase<StringTypes>
// 实现 CamelCase <T>，将连字符转驼峰

type CamelCase<T extends string> = T extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : T;

// T1 = helloWorldWolf
type T1 = CamelCase<"hello-world-wolf">;
// helloWorld
type T2 = CamelCase<"hello-world">;

export {};
