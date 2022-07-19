// PromiseType<Types>
// 用于获取 Promise 包裹的类型

// T extends Promise<infer R> 用于判断 T 是否是 Promise<infer R> 的子类型
// T 需要满足 Promise<any>
type PromiseType<T> = T extends Promise<infer R> 
  ? R extends Promise<any> 
    ? Promise<R> 
    : R 
  : never;

const getInfo = (): Promise<string | number> => Promise.resolve(1);
// funType = () => Promise<string | number>
type T1 = typeof getInfo;
// Promise<string | number>
type T2 = ReturnType<T1>;
// string | number
type T3 = PromiseType<T2>;
// never
type T4 = PromiseType<'string' | 'number'>

export {};
