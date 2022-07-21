// TupleToObject 将一个元祖转换为一个 key/value 都相同的对象

// T[number] 返回数字索引的 value
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};

type TupleToObject2<T extends any[]> = {
  [K in T[number]]: K;
};

// as const 用于常量断言
const tuple = ["name", "height"] as const;
const tuple2 = ["name", "height"];

type result = TupleToObject<typeof tuple>;
type result2 = TupleToObject2<typeof tuple2>;

const obj: result = {
  name: "name",
  height: "height",
};

export {};
