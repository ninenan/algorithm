// Record<Keys, Types>
// 用于构造一个对象类型，它所有的key(键)都是Keys类型，它所有的value(值)都是Type类型。这个工具类型可以被用于映射一个类型的属性到另一个类型。

interface ICatInfo {
  name: string;
  age: number;
}

type CatName = "n1" | "n2" | "n3";

const cats: Record<CatName, ICatInfo> = {
  n1: {
    name: "n1",
    age: 1,
  },
  n2: {
    name: "n2",
    age: 2,
  },
  n3: {
    name: "n3",
    age: 3,
  },
};

// K extends keys any
// K 是 keyof any 的子类
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};

const cats2: MyRecord<CatName, ICatInfo> = {
  n1: {
    name: "n1",
    age: 1,
  },
  n2: {
    name: "n2",
    age: 2,
  },
  n3: {
    name: "n3",
    age: 3,
  },
};

export {};
