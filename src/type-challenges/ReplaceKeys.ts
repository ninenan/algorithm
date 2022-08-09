// ReplaceKeys<Types, KeyTypes, Types>
// 实现 ReplaceKeys 类型，该类型替换联合类型中的键，如果某些类型没有此键，只需跳过替换，类型接受三个参数。

type ReplaceKeys<T, K, U> = {
  [P in keyof T]: P extends K ? (P extends keyof U ? U[P] : never) : T[P];
};

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type Nodes = NodeA

// ReplacedNodes = { type: 'A', name: number, flag: string }
type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> 

const obj: ReplacedNodes = {
  type: 'A',
  name: 12,
  flag: 'flag'
}

// ReplacedNotExistKeys = { type: 'A', name: never, flag: number } 
type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}>

export {};
