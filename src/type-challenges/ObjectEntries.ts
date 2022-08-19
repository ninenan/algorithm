// ObjectEntries<Types>
// 实现 Object.entry 的类型版本

type ObjectEntries<T, U = Required<T>> = {
  [K in keyof U]: [K, U[K]]
}[keyof U]

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

// modelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];
type modelEntries = ObjectEntries<Model> 

const arr1: modelEntries = ['name', 'name'];
const arr2: modelEntries = ["age", 18];
const arr3: modelEntries = ['locations', ['locations']];
const arr4: modelEntries = ['locations', null];

export {}
