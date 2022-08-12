// PickByType<Types, Types>
// 根据类型选取属性

type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }

const T1: OnlyBoolean = {
  isEnable: false,
  isReadonly: true
}

console.log(T1)

export {}
