// Mutable<T>
// 实现一个通用的类型 Mutable<T>，使类型 T 的全部属性可变（非只读）。

type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }

const obj: MutableTodo = {
  title: 'title',
  description: 'description',
  completed: false
}

obj.title = 'title1';

export {};
