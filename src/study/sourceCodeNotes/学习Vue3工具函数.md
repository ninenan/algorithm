# Vue3 工具函数学习

[源码地址](https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts)

```typescript
// 判断当前环境不是生产环境
__DEV__ = process.env.NODE_ENV !== "production";
```

#### EMPTY_OBJ

空对象

[Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

```typescript
const EMPTY_OBJ: { readonly [key: string]: any } = __DEV__
  ? Object.freeze({})
  : {};

// Object.freeze 主要用于冻结对象
// 冻结对象
const obj = {
  prop: 42,
};
Object.freeze(obj);
obj.prop = 43;

console.log(obj); // { prop: 42 }

// 对于一个常量对象，整个引用图（直接和间接引用其他对象）只能引用不可变的冻结对象
const obj2 = {
  props: {},
};
Object.freeze(obj2);
obj2.props.name = "test";

console.log(obj2); // { props: { name: 'test' } }

// 冻结数组
let arr = [0];
Object.freeze(arr); // 现在数组不能被修改了
arr[0] = 1; // fails silently
// arr.push(2); // Cannot add property 1, object is not extensible

console.log(arr); // [0]
```

#### EMPTY_ARR

空数组

```typescript
const EMPTY_ARR = __DEV__ ? Object.freeze([]) : [];

let arr = [0];
Object.freeze(arr); // 现在数组不能被修改了

arr[0] = 1; // fails silently
// arr.push(2); // Cannot add property 1, object is not extensible
console.log(arr); // [0]
```

#### NOOP

[No Operation](https://stackoverflow.com/questions/21634886/what-is-the-javascript-convention-for-no-operation)

```typescript
const NOOP = () => {};

/* 作用
1. 为函数提供默认值
2. 代码压缩 */
```

#### NO

一直返回 false。

```typescript
const NO = () => false;
```

#### isOn

判断字符串是否是以 on 开头，并且 on 后面的第一个字符必须是大写。

```typescript
const onRE = /^on[^a-z]/;

const isOn = (key: string) => onRE.test(key);

console.log(isOn("test")); // false
console.log(isOn("onChange")); // true
console.log(isOn("onClick")); // true
console.log(isOn("onselect")); // false
```

#### isModelListener

判断字符串是否是以 onUpdate: 开头

```typescript
const isModelListener = (key: string) => key.startsWith("onUpdate:");
```

#### extend

```typescript
const extend = Object.assign;
```

#### remove

删除数组中的某项值

```typescript
const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
```

#### hasOwn

判断当前对象是否有某个属性

```typescript
const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

const symbol1 = Symbol("111");
const symbol2 = Symbol("222");
const obj = {
  name: "1111",
  [symbol1]: "2222",
};

console.log(hasOwn(obj, "name")); // true
console.log(hasOwn(obj, "sex")); // false
console.log(hasOwn(obj, symbol1)); // true
console.log(hasOwn(obj, symbol2)); // false
```

#### isArray

判断是否是数组
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

```typescript
const isArray = Array.isArray;

console.log(isArray([])); // true
console.log(isArray([1, 2, 3])); // true
console.log(isArray("111")); // false
console.log(isArray(null)); // false
console.log(isArray(undefined)); // false
console.log(isArray({})); // false
```

#### isMap

判断是否是 map 类型

```typescript
const objectToString = Object.prototype.toString;
const toTypeString = (val: unknown): string => objectToString.call(val);
const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === "[object Map]";
const map: Map<number, number> = new Map([[1, 1]]);

console.log(isMap(map)); // true
console.log(isMap(false)); // false
console.log(isMap(1)); // false
console.log(isMap("2")); // false
console.log(isMap({})); // false
console.log(isMap([])); // false
console.log(isMap(null)); // false
console.log(isMap(undefined)); // false
```

#### isSet

判断是否是 set 类型

```typescript
const objectToString = Object.prototype.toString;
const toTypeString = (val: unknown): string => objectToString.call(val);
const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === "[object Set]";
const map: Map<number, number> = new Map([[1, 1]]);
const set = new Set([1, 2, 3]);

console.log(isSet(set)); // true
console.log(isSet(map)); // false
console.log(isSet(false)); // false
console.log(isSet(1)); // false
console.log(isSet("2")); // false
console.log(isSet({})); // false
console.log(isSet([])); // false
console.log(isSet(null)); // false
console.log(isSet(undefined)); // false
```

#### isDate

判断是否是 Date 类型

```typescript
const isDate = (val: unknown): val is Date => val instanceof Date;

console.log(isDate(1)); // false
console.log(isDate(false)); // false
console.log(isDate({})); // false
console.log(isDate([])); // false
console.log(isDate(new Date())); // true
```

#### isFunction

判断是否是函数

```typescript
const isFunction = (val: unknown): val is Function => typeof val === "function";

console.log(isFunction(() => {})); // true
console.log(isFunction(null)); // false
console.log(isFunction(undefined)); // false
console.log(isFunction({})); // false
```

#### isString

判断是否是字符串

```typescript
const isString = (val: unknown): val is string => typeof val === "string";

console.log(isString("")); // true
console.log(isString(undefined)); // false
console.log(isString(null)); // false
```

#### isSymbol

判断是否是 Symbol 类型

```typescript
const isSymbol = (val: unknown): val is symbol => typeof val === "symbol";

console.log(isSymbol(Symbol())); // true
console.log(isSymbol(null)); // false
console.log(isSymbol(undefined)); // false
console.log(isSymbol("")); // false
```

#### isObject

判断是否是 object

```typescript
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

console.log(isObject({})); // true
console.log(isObject("")); // false
console.log(isObject(1)); // false
console.log(isObject(null)); // false
console.log(isObject(undefined)); // false
```

#### isPromise

判断是否 promise 类型

```typescript
const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";
const isFunction = (val: unknown): val is Function => typeof val === "function";
const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  isObject(val) && isFunction(val.then) && isFunction(val.catch);
const testPromise = Promise.resolve();

console.log(isPromise(testPromise)); // true
console.log(isPromise({})); // false
console.log(isPromise("")); // false
console.log(isPromise(1)); // false
console.log(isPromise(null)); // false
console.log(isPromise(undefined)); // false
```

#### toRawType

从字符串中提取“Rawtype”，如“[对象 Rawtype]”

```typescript
const objectToString = Object.prototype.toString;
const toTypeString = (val: unknown): string => objectToString.call(val);
const toRawType = (val: unknown): string => toTypeString(val).slice(8, -1);

console.log(toRawType({})); // Object
console.log(toRawType([])); // Array ​​​​
console.log(toRawType(false)); // Boolean
console.log(toRawType(null)); // Null
console.log(toRawType(undefined)); // Undefined
console.log(toRawType("")); // String
console.log(toRawType(1)); // Number
console.log(toRawType(Symbol())); // Symbol
console.log(toRawType(new Date())); // Date
console.log(toRawType(new Map())); // Map
console.log(toRawType(new Set())); // Set
```

#### isPlainObject

是否是普通对象

```typescript
const objectToString = Object.prototype.toString;
const toTypeString = (val: unknown): string => objectToString.call(val);

export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === "[object Object]";

console.log(isPlainObject({})); // true
console.log(isPlainObject(null)); // false
console.log(isPlainObject(undefined)); // false
console.log(isPlainObject("")); // false
console.log(isPlainObject(1)); // false
console.log(isPlainObject(false)); // false
```

#### isIntegerKey

是否是正整数字符串

```typescript
const isString = (val: unknown): val is string => typeof val === "string";

const isIntegerKey = (key: unknown): key is string =>
  isString(key) &&
  key !== "NaN" &&
  key[0] !== "-" &&
  "" + parseInt(key, 10) === key;

console.log(isIntegerKey("123123")); // true
console.log(isIntegerKey("-123123")); // false
console.log(isIntegerKey("-123123")); // false
```

#### isReservedProp

```typescript
const isReservedProp = /*#__PURE__*/ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref," +
    "onVnodeBeforeMount,onVnodeMounted," +
    "onVnodeBeforeUpdate,onVnodeUpdated," +
    "onVnodeBeforeUnmount,onVnodeUnmounted"
);

function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null);
  const list: Array<string> = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  console.log(map);
  return expectsLowerCase
    ? (val) => !!map[val.toLowerCase()]
    : (val) => !!map[val];
}

console.log(isReservedProp("")); // true
console.log(isReservedProp("key")); // true
console.log(isReservedProp("onVnodeBeforeMount")); // true
console.log(isReservedProp("onVnodeMounted")); // true
console.log(isReservedProp("onVnodeBeforeUpdate")); // true
console.log(isReservedProp("onVnodeUpdated")); // true
console.log(isReservedProp("onVnodeBeforeUnmount")); // true
console.log(isReservedProp("onVnodeUnmounted")); // true
console.log(isReservedProp("test01")); // false
console.log(isReservedProp("test02")); // false
```

#### cacheStringFunction

缓存函数
单例模式

```typescript
const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  // 设置一个缓存 对象
  const cache: Record<string, string> = Object.create(null);

  return ((str: string) => {
    const hit = cache[str];
    // hit 如果存在直接返回 不存在 就返回传入的函数所返回的值 并在 cache 中 缓存相应的值
    return hit || (cache[str] = fn(str));
  }) as any;
};
```

#### camelize

驼峰化

```typescript
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

console.log(camelize("on-click")); // onClick
console.log(camelize("on-click")); // onClick 第二次 直接走缓存了
```

#### hyphenate

连字符

```typescript
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str: string) =>
  str.replace(hyphenateRE, "-$1").toLowerCase()
);

console.log(hyphenate("appleBanana")); // apple-banana
console.log(hyphenate("onClick")); // on-click
console.log(hyphenate("onChange")); // on-change
```

#### capitalize

首字母大写

```typescript
const capitalize = cacheStringFunction(
  (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
);

console.log(capitalize("appleBanana")); // AppleBanana
console.log(capitalize("onClick")); // OnClick
console.log(capitalize("onChange")); // OnChange
```

#### toHandlerKey

字符串 on 开头

```typescript
const toHandlerKey = cacheStringFunction((str: string) =>
  str ? `on${capitalize(str)}` : ``
);

console.log(toHandlerKey(capitalize("appleBanana"))); // onAppleBanana
console.log(toHandlerKey(capitalize("onClick"))); // onOnClick
console.log(toHandlerKey(capitalize("onChange"))); // onOnChange
```

#### hasChanged

判断两个值是否为同一个值

[Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

```typescript
const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue);

console.log(Object.is(1, 1)); // true
console.log(Object.is("xxx", "xxx")); // true
console.log(Object.is({}, {})); // false
console.log(Object.is({}, {})); // false
console.log(Object.is(-0, +0)); // false
console.log(+0 === -0); // true
console.log(Object.is(NaN, NaN)); // true
console.log(NaN === NaN); // false
```

#### invokeArrayFns

执行函数数组中的每个函数

```typescript
const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
```

#### def

```typescript
const def = (obj: object, key: string | symbol, value: any) => {
  Object.defineProperty(obj, key, {
    // 属性是否可以被删除
    configurable: true,
    // 是否可以被枚举
    enumerable: false,
    value,
  });
};
```

#### toNumber

```typescript
const toNumber = (val: any): any => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

console.log(toNumber("11")); // 11
console.log(toNumber("-11")); // -11
console.log(toNumber("NaN")); // NaN
```

#### getGlobalThis

获取全局 this 指向

```typescript
let _globalThis: any;
const getGlobalThis = (): any => {
  return (
    _globalThis ||
    (_globalThis =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
        ? self
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : {})
  );
};
```

### 总结

1. 复习了单例模式
2. 学习了为什么需要 NOOP 函数
3. 学习了 promise 函数的判断
4. ts 真香
5. 全局 this 指向的判断
