// AppendToObject<ObjectTypes, key, value>
// 实现一个为接口添加一个新字段的类型。该类型接收三个参数，返回带有新字段的接口类型。

interface T1 {
  id: "id";
};

type AppendToObject<T, K extends string | symbol | number, V> = {
  [P in keyof T | K]: P extends keyof T ? T[P] : V;
};

type T2 = AppendToObject<T1, 'vale', 4>

export {}
