// OmitByType<T, U>
// 从 T，选择一组属性的类型，不属于 U

type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

type OmitBoolean = OmitByType<{
  name: string;
  count: number;
  isReadonly: boolean;
  isEnable: boolean;
}, boolean> // { name: string; count: number }

const obj: OmitBoolean = {
  name: 'name',
  count: 12,
}

console.log(obj);

export {};
