// DeepReadonly<Types>
// DeepReadonly 用来将一个嵌套对象类型中所有字段全部添加 readonly 关键词

interface IX {
  a: string;
  b: {
    c: string;
    d: boolean;
  };
  e: number;
}

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string, any> ? DeepReadonly<T[K]> : T[K]
}

const o1: DeepReadonly<IX> = {
  a: 'a',
  b: {
    c: 'c',
    d: false
  },
  e: 222
}

// o1.b.c = 'ccc' // 无法分配到 "c" ，因为它是只读属性。
// o1.b = {} // 无法分配到 "b" ，因为它是只读属性。 

export {}
