// Lo// LookUp<Types>
// LookUp 根据类型值查找类型

interface ICat {
  name: 'cc',
  color: 'red' | 'black',
  type: 'cat'
}

interface IDog {
  name: 'dd',
  color: 'white',
  type: 'dog'
}

type LookUp<T extends { type: string }, V extends string> = T extends { type : V  } ? T : never

// T1 = IDog
type T1 = LookUp<ICat | IDog, 'dog'>
// T2 = ICat
type T2 = LookUp<ICat | IDog, 'cat'>

export {}
