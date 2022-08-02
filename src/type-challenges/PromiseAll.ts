// PromiseAll 是用来取 Promise.all() 函数所有返回的类型，声明的是一个 function，不是一个 type

declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K];
}>

const promise1 = Promise.resolve(1);
const promise2 = 33;
const promise3 = new Promise<string>((resolve) => {
  setTimeout(resolve, 100, 'foo');
});

// fn = () => Promise<number, number, string>
const fn = () => Promise.all([1, 2, Promise.resolve('3')]);
// p2 = Promise<number, number, string>
const p2 = PromiseAll([promise1, promise2, promise3]);

export {}

