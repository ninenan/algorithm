# 手写实现

## new

1. 创建一个空对象
2. 为创建的空对象添加\_\_proto\_\_属性，并将其链接至构造函数的 prototype
3. 为创建的对象作为 this 的上下文
4. 如果函数没有返回对象，则返回 this

```javascript
function myNew() {
  // 创建一个空对象
  let obj = new Object();
  // 获取构造函数，去除 arguments 的第一个参数
  let Constructor = [].shift.call(arguments);
  // 将空对象的 __proto__ 指向 构造函数的 prototype
  obj.__proto__ = Constructor.prototype;
  // 绑定 this，obj 可以访问构造函数中的属性
  let res = Constructor.apply(obj, arguments);
  return res instanceof Object ? res : obj;
}
```

> [(掘金若川大佬)参考链接](https://juejin.cn/post/6844903704663949325)

```typescript
function myNew() {
  const ctor = [].shift.call(arguments);
  if (!isFun(ctor)) return "the first param must be a function";

  // Es6 new.target = 构造函数
  myNew.target = ctor;

  let obj = Object.create(ctor.prototype);
  let res = ctor.apply(obj, arguments);

  function isFun(param) {
    return typeof param === "function";
  }
  function isObject(param) {
    return typeof param === "object" && param !== null;
  }

  if (isFun(res) || isObject(res)) return res;
  return obj;
}
```

```javascript
// demo.js
function myNew() {
  // 创建一个空对象
  let obj = new Object();
  // 获取构造函数，去除 arguments 的第一个参数
  let Constructor = [].shift.call(arguments);
  // 将空对象的 __proto__ 指向 构造函数的 prototype
  obj.__proto__ = Constructor.prototype;
  // 绑定 this，obj 可以访问构造函数中的属性
  let res = Constructor.apply(obj, arguments);
  return res instanceof Object ? res : obj;
}

function Person(name, sex) {
  this.name = name;
  return {
    sex: sex,
    height: 178,
  };
}

let person1 = new Person("zhangsan", true);

console.log(person1.name); // undefined
console.log(person1.sex); // true
console.log(person1.height); // 178

let person2 = myNew(Person, "zhangsan", true);
console.log(person2.name); // undefined
console.log(person2.sex); // true
console.log(person2.height); // 178
```

## instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```javascript
function myInstanceof(paramL, paramR) {
  let L = paramL.__proto__;
  let R = paramR.prototype;

  while (true) {
    if (!L) {
      return false;
    }
    if (L === R) {
      return true;
    }
    L = L.__proto__;
  }
}

// demo
function Foo() {}

console.log(myInstanceof(Object, Object)); // true
console.log(myInstanceof(Function, Function)); // true
console.log(myInstanceof(Foo, Foo)); // false
```

## call

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
[Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

> [JavaScript 深入之 call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

```javascript
// 传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
// context 不传就默认是 window 环境
Function.prototype.myCall = function (context = window, ...rest) {
  rest = rest ? rest : [];
  // 给 context 新增一个独一无二的属性防止覆盖原有的属性
  const key = Symbol();
  // 获取调用call的函数，用this可以获取
  context[key] = this;
  // 通过隐式绑定的方式调用函数
  const result = context[key](...rest);
  // 删除添加的属性
  delete context[key];
  // 返回函数调用的返回值
  return result;
};

// demo
function foo(sex, catName) {
  console.log(this.name);
  console.log(this.age);
  console.log(sex);
  console.log(catName);
}
const obj = {
  name: "xxx",
  age: 25,
};

foo.call(obj, false, "catXXX"); // xxx 25 false catXXX
foo.myCall(obj, false, "catXXX"); // xxx 25 false catXXX

console.log(Math.max.call(Math, 1, 2, 3, 4, 1, 10)); // 10
console.log(Math.max.myCall(Math, 1, 2, 3, 4, 1, 10)); // 10

console.log([].shift.call([1, 2, 3, 4, 5, 6])); // 1
console.log([].shift.myCall([1, 2, 3, 4, 5, 6])); // 1
```

## apply

apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

[Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

> [JavaScript 深入之 call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

```javascript
Function.prototype.myApply = function (context = window, ...reset: any[]) {
  reset = Array.isArray(reset[0]) ? reset[0] : [];
  // 给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol();
  // 这里的 this 是调用者
  context[key] = this;
  const result = context[key](...reset);
  // 删除副作用属性
  delete context[key];
  return result;
};

// demo
function foo(sex, catName) {
  console.log(this.name);
  console.log(this.age);
  console.log(sex);
  console.log(catName);
}
const obj = {
  name: "xxx",
  age: 25,
};

foo.apply(obj, [false, "catXXX"]); // xxx 25 false catXXX
foo.myApply(obj, [false, "catXXX"]); // xxx 25 false catXXX

console.log(Math.max.apply(Math, [1, 2, 3, 4, 1, 10])); // 10
console.log(Math.max.myApply(Math, [1, 2, 3, 4, 1, 10])); // 10

console.log([].shift.apply([1, 2, 3, 4, 5, 6])); // 1
console.log([].shift.myApply([1, 2, 3, 4, 5, 6])); // 1
```

## bind

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

**一个绑定函数也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。**

[Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

> [JavaScript 深入之 bind 的模拟实现](https://github.com/yygmind/blog/issues/23)

```javascript
Function.prototype.myBind = function (context = window) {
  let self = this;
  let NOOP = function () {};

  // 获取函数从第二个参数到最后一个参数
  const args = [].slice.call(arguments, 1);
  // const args = Array.prototype.slice.call(arguments, 1); 也可以使用这种写法
  let fBound = function () {
    // 这时候的 arguments 是 bind 返回的函数所传递的参数
    const bindArgs = [].slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    return self.apply(
      this instanceof NOOP ? this : context,
      args.concat(bindArgs)
    );
  };

  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  NOOP.prototype = this.prototype;
  fBound.prototype = new NOOP();
  return fBound;
};

// demo
let testFoo = {
  value: 1,
};

function bar(name: string, age: number) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = "xxx";

let bindFoo = bar.bind(testFoo, "xxx1");
let testObj = new bindFoo(18);

// undefined
// xxx1
// 18
console.log(testObj.habit); // shopping
console.log(testObj.friend); // xxx

let bindFoo2 = bar.myBind(testFoo, "xxx2");
let testObj2 = new bindFoo2(20);
// undefined
// xxx2
// 20
console.log(testObj2.habit); // shopping
console.log(testObj2.friend); // xxx
```

## debounce

在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

> [JavaScript 专题之跟着 underscore 学防抖](https://github.com/mqyqingfeng/Blog/issues/22)

**简易版本**

```javascript
const debounce = function (fn, delay = 500) {
  let timer: null | ReturnType<typeof setTimeout> = null;

  const debounced = (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      return fn.apply(this, args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return debounced;
};

// demo
document.getElementsByTagName("img")[0].addEventListener(
  "click",
  debounce(() => console.log("2222"))
);
```

**多功能版本**

```typescript
/**
 * 防抖
 * 事件在 n 后执行，如果 n 秒内别多次执行，则重新计时
 * 当使用 immediate 时候，
 * 此时注意一点，就是回调函数可能是有返回值的，
 * 所以我们也要返回函数的执行结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout ，
 * 我们将 fn.apply(context, args) 的返回值赋给变量，
 * 最后再 return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 * @returns 返回回调函数执行的结果
 */
const debounce = (fn: Function, delay = 500, immediate = false) => {
  let timer: null | ReturnType<typeof setTimeout> = null;

  const debounced = function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      // 如果已经执行了，则不再执行
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) {
        return fn.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        return fn.apply(this, args);
      }, delay);
    }
  };

  /**
   * 取消 debounce 函数
   */
  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
  };

  return debounced;
};
```

```typescript
// demo
const imgNode = document.getElementsByTagName("img")[0];
const btn = document.getElementsByTagName("button")[0];

function testFn2(event: EventTarget) {
  console.log("event :>> ", event);
}
const clickTestFn = debounce(testFn2, 5000, true);

imgNode.addEventListener("click", clickTestFn);
btn.addEventListener("click", () => clickTestFn.cancel());
```

## throttle

> [JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)

在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

**简易版本**

```javascript
// 定时器版本
const throttle = function (fn, delay = 500) {
  let flag = true;

  return function (...args) {
    if (!flag) return;
    flag = false;

    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};

// 时间戳版本
const throttle = function (fn: Function, delay: number) {
  let previous = 0;

  return function (...reset: unknown[]) {
    const now = +new Date();
    if (now - previous > delay) {
      previous = now;
      fn.apply(this, reset);
    }
  };
};
```

**多功能版本**

```typescript
// 有头有尾
// 事件立即触发，停止触发之后还会再次触发一次
const throttle = function (fn: Function, delay: number) {
  let timer: null | ReturnType<typeof setTimeout> = null,
    previous = 0,
    args: any = null,
    context: any = null;

  const later = function () {
    previous = +new Date();
    timeout = null;
    fn.apply(context, args);
  };

  const throttled = function () {
    const now = +new Date();
    // 下次触发 fn 的剩余事件
    const remaining = delay - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余时间或者用户修改了系统时间
    if (remaining <= 0 || remaining > delay) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, delay);
    }
  };

  return throttled;
};
```

```typescript
// 有头无尾/无头有尾
// 事件立即触发，停止触发之后不会再次触发一次
// 事件不会立即触发，停止触发之后不会再次触发一次
interface IOptions {
  leading?: boolean; // 表示禁用第一次执行 true-不禁用 false-禁用
  trailing?: boolean; // 表示禁用停止触发的回调 true-不禁用 false-禁用
}

const throttle4 = function (
  fn: Function,
  delay: number,
  options: IOptions = { leading: true }
) {
  let timeout: null | ReturnType<typeof setTimeout> = null,
    context: any = null,
    previous: number = 0,
    args: any = null;

  const later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    fn.apply(context, args);
    if (!timeout) context = args = null;
  };
  const throttled = function () {
    const now = +new Date();
    if (!previous && options.leading === false) previous = now;
    const remaining = delay - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余时间了或者用户修改了系统时间
    if (remaining <= 0 || remaining > delay) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, delay);
    }
  };

  /**
   * 取消
   */
  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    previous = 0;
    timeout = null;
  };

  return throttled;
};

// 三种使用方式
/* 1. throttle(getUserAction, 1000);
2. throttle(getUserAction, 1000, { leading: false });
3. throttle(getUserAction, 1000, { trailing: false }); */
```

## 继承

### 原型链继承

```javascript
function SuperType() {
  this.property = true;
  this.colors = ["red", "white"];
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subProperty = false;
}

// 关键代码
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
  return this.subProperty;
};

let instance1 = new SubType();
instance1.colors.push("blue");

console.log(instance1.property); // true
console.log(instance1.colors); // [ 'red', 'white', 'blue' ]
console.log(instance1.getSuperValue()); // true
console.log(instance1.getSubValue()); // false

let instance2 = new SubType();

console.log(instance1.property); // true
console.log(instance1.colors); // ['red', 'white', 'blue']
console.log(instance1.getSuperValue()); // true
console.log(instance1.getSubValue()); // false
```

**缺点**

1. 多个实例对**引用类型**的操作会被篡改。
2. 不能传递参数

### 借用构造函数继承

```javascript
function SuperType(name) {
  this.property = true;
  this.colors = ["red", "white"];
  this.name = name;
}

SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  // 继承自SuperType 因此SubType的每个实例都会将SuperType中的属性复制一份。
  SuperType.call(this, "name1");
}

SubType.prototype.getSubValue = function () {
  return this.subProperty;
};

let instance1 = new SubType();
instance1.colors.push("blue");
console.log(instance1.property); // true
console.log(instance1.colors); // [ 'red', 'white', 'blue' ]
console.log(instance1.getSuperValue()); // instance1.getSuperValue is not a function

let instance2 = new SubType();
console.log(instance2.property); // true
console.log(instance2.colors); // [ 'red', 'white' ]
```

1. 只能继承父类的实例属性和方法，不能继承**原型**属性/方法
2. 无法实现复用，每个子类都有父类实例函数的副本，影响性能

### 组合继承

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "black"];
}

SuperType.prototype.getColors = function () {
  return this.colors;
};

function SubType(name) {
  // 继承实例属性/方法 第二次调用 Supertype()
  SuperType.call(this, name);
}

// 继承原型属性/方法 第一次调用 Supertype()
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

let instance1 = new SubType("zhangsan");

console.log(instance1.name); // zhangsan
instance1.colors.push("white");
console.log(instance1.getColors()); // [ 'red', 'black', 'white' ]

let instance2 = new SubType("xiaoming");

console.log(instance2.name); // xiaoming
instance2.colors.push("blue");
console.log(instance2.getColors()); // [ 'red', 'black', 'blue' ]
```

**缺点**

1. 多占用内存，使用子类创建实例时，其原型中会存在两次相同的属性/方法。

### 原型式继承

利用一个空对象，将某个对象直接赋值给空对象的构造上的原型
其实就是 Object.create()

```javascript
function myObject(param) {
  function F() {}
  F.prototype = param;
  return new F();
}

let person = {
  name: "zhangsan",
  friends: ["wwangwu", "lisi"],
};

let anotherPerson = myObject(person);
// let anotherPerson = Object.create(person) // 一样的作用

anotherPerson.name = "xiaoming";
anotherPerson.friends.push("xiaohong");

let yetAnotherPerson = myObject(person);
console.log(yetAnotherPerson.friends); // [ 'wwangwu', 'lisi', 'xiaohong' ]
```

**缺点**

1. 无法传递参数
2. 多个实例对引用类型的操作会被篡改。

### 寄生式继承

创建一个实例继承的函数，以某种方式增强对象，然后返回这个对象。

```javascript
function myObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
function createPeron(obj) {
  let clone = myObject(obj);
  clone.sayHi = function () {
    console.log("Hi");
  };
  return clone;
}

let person = {
  name: "zhangsan",
  friends: ["xiaoming"],
};

let anotherPerson = createPeron(person);
anotherPerson.sayHi(); // Hi
```

**缺点**

1. 无法传递参数
2. 多个实例对引用类型的操作会被篡改

### 寄生组合式继承 ✨✨✨✨✨✨

```javascript
function inheritPrototype(SubType, Supertype) {
  // 创建对象，父类对象的副本
  let prototype = Object.create(Supertype.prototype);
  // 增强对象，定义因为重写原型丢失的 constructor 属性
  prototype.constructor = SubType;
  // 指定对象，将创建的对象赋值给子类的原型
  SubType.prototype = prototype;
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "black"];
}

SuperType.prototype.getColors = function () {
  return this.colors;
};

// 关键代码
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

// 关键代码
// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

SubType.prototype.getAge = function () {
  return this.age;
};

let instance1 = new SubType("zhangsan", 18);
console.log(instance1.name); // zhangsan
console.log(instance1.age); // 18
instance1.colors.push("white");
console.log(instance1.getColors()); // [ 'red', 'black', 'white' ]

let instance2 = new SubType("xiaoming", 25);

console.log(instance2.name); // xiaoming
console.log(instance2.age); // 25
instance2.colors.push("blue");
console.log(instance2.getColors()); // [ 'red', 'black', 'blue' ]
```

这里只调用了一次 SuperType 构造函数，避免了 SubType.prototype 上不必要也用不到的属性，
因此可以说这个例子的效率更高。

**寄生式组合继承**可以算是引用类型继承的最佳模式。

## 数组去重

```typescript
const unique = (arr: number[]) => {
  let res: number[] = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let flag = true;

    for (let j = 0; j < res.length; j++) {
      if (res[j] === element) {
        flag = false;
        break;
      }
    }

    if (flag) {
      res.push(element);
    }
  }

  return res;
};
```

### indexOf

```typescript
const unique = (arr: number[]) => {
  let res: number[] = [];
  arr.forEach((item) => {
    if (res.indexOf(item) === -1) {
      res.push(item);
    }
  });
  return res;
};
```

### sort

```typescript
const unique = (arr: any[]): any[] => {
  let res = [];
  let cache = null;
  arr.sort();

  for (let index = 0; index < arr.length; index++) {
    if (!index || cache !== arr[index]) res.push(arr[index]);
    cache = arr[index];
  }

  return res;
};
```

### reduce

```typescript
const unique = (arr: number[]): number[] => {
  return arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) pre.push(cur);
    return pre;
  }, []);
};
```

### includes

```typescript
const unique = (arr: number[]) => {
  let res: number[] = [];
  arr.forEach((item) => {
    if (!res.includes(item)) {
      res.push(item);
    }
  });
  return res;
};
```

### set

```typescript
const unique = (arr: number[]): number[] => {
  return [...new Set(arr)];
};
```

### filter

```typescript
const unique = (arr: any[]): any[] => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

const unique = (arr: any[]): any[] => {
  const cacheMap: Map<any, number> = new Map();

  return arr.filter((item) => !cacheMap.has(item) && cacheMap.set(item, 0));
};
```

## 深拷贝

> [深拷贝的终极探索](https://juejin.cn/post/6844903692756336653#heading-3) [面试题之如何实现一个深拷贝](https://github.com/yygmind/blog/issues/29)

### 只涉及对象

#### 递归

```javascript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const objectToString = Object.prototype.toString;
const hasOwn = (obj, key) => hasOwnProperty.call(obj, key);
const isObject = (val) => objectToString.call(val).slice(8, -1) === "Object";

const deepClone = (source) => {
  if (!isObject(source)) return source;

  const target = {};
  for (const key in source) {
    if (hasOwn(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
};
```

#### 不使用递归

```javascript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const objectToString = Object.prototype.toString;
const isObject = (val) => objectToString.call(val).slice(8, -1) === "Object";
const deepClone = (source) => {
  const root = {};
  const loopList = [
    {
      parent: root,
      key: undefined,
      data: source,
    },
  ];

  while (loopList.length) {
    const node = loopList.pop();
    const { data, key, parent } = node;

    let res = parent;

    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    for (const key in data) {
      if (hasOwnProperty.call(data, key)) {
        if (isObject(data[key])) {
          loopList.push({
            parent: res,
            key,
            data: data[key],
          });
        } else {
          res[key] = data[key];
        }
      }
    }
  }

  return root;
};
```

### 破解循环引用

**设置一个数组或者哈希表存储已拷贝过的对象，当检测到当前对象已存在于哈希表中时，取出该值并返回即可。**

#### 使用 weakMap

```javascript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const objectToString = Object.prototype.toString;
const isObject = (val) => objectToString.call(val).slice(8, -1) === "Object";

const cloneDeep3 = (source, hash = new WeakMap()) => {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source);

  const target = {};
  // 关键代码 哈希表设值
  hash.set(source, target);

  for (const key in source) {
    if (hasOwnProperty.call(source, key)) {
      if (isObject(source)) {
        target[key] = cloneDeep3(source, hash);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
};

// demo
var a = {
  name: "test",
  testFn: a,
};
let a2 = cloneDeep3(a);
console.log(a2); // { name: [Circular], testFn: [Circular] }
```

#### 使用数组

```javascript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const objectToString = Object.prototype.toString;
const isObject = (val) => objectToString.call(val).slice(8, -1) === "Object";

const cloneDeep3 = (source, uniqueList = []) => {
  if (!isObject(source)) return source;

  const target = {};

  // 数据已经存在，则返回保存时的数据
  const uniqueData = find(uniqueList, source);
  if (uniqueData) {
    return uniqueData.target;
  }

  // 数据不存在，保存源数据，以及对应的引用
  uniqueList.push({
    source,
    target,
  });

  for (const key in source) {
    if (hasOwnProperty.call(source, key)) {
      if (isObject(source)) {
        target[key] = cloneDeep3(source, uniqueList);
      } else {
        target[key] = source[key];
      }
    }
  }

  function find(uniqueList, source) {
    for (let index = 0; index < uniqueList.length; index++) {
      if (uniqueList[index].source === source) {
        return uniqueList[index];
      }
    }
    return null;
  }

  return target;
};
```

#### 不使用递归

```javascript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const objectToString = Object.prototype.toString;
const isObject = (val) => objectToString.call(val).slice(8, -1) === "Object";

const deepClone = (source) => {
  const uniqueList = [];
  let root = {};

  const loopList = [
    {
      parent: root,
      key: undefined,
      data: source,
    },
  ];

  while (loopList.length) {
    const node = loopList.pop();
    const { parent, key, data } = node;

    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    // 如果数据已经存在
    const uniqueData = find(uniqueList, data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      // 中断本次循环
      continue;
    }

    // 数据不存在
    uniqueList.push({
      target: res,
      source: data,
    });

    for (const key in data) {
      if (hasOwnProperty.call(data, key)) {
        if (isObject(data[key])) {
          loopList.push({
            parent: res,
            key,
            data: data[key],
          });
        } else {
          res[key] = data[key];
        }
      }
    }
  }
  return root;
};

function find(uniqueList, source) {
  for (let index = 0; index < uniqueList.length; index++) {
    if (uniqueList[index].source === source) {
      return uniqueList[index];
    }
  }

  return null;
}
```

#### WeakMap

```javascript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (obj, key) => hasOwnProperty.call(obj, key);
const objectToString = Object.prototype.toString;
const isObject = (val) => objectToString.call(val).slice(8, -1) === "Object";

const deepClone = (source) => {
  let root = {};
  const map = new WeakMap();

  const loopList = [
    {
      parent: root,
      key: undefined,
      data: source,
    },
  ];

  while (loopList.length) {
    const node = loopList.pop();
    const { parent, key, data } = node;
    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== "undefined") {
      res = parent[key] = {};
    }

    // 如果数据已经存在
    const uniqueData = map.has(data);
    if (uniqueData) {
      parent[key] = map.get(data);
      continue;
    }
    // 数据不存在
    map.set(data, res);

    for (const key in data) {
      if (hasOwn(data, key)) {
        if (isObject(data[key])) {
          loopList.push({
            parent: res,
            key,
            data: data[key],
          });
        } else {
          res[key] = data[key];
        }
      }
    }
  }
  return root;
};
```

## 求最大/最小值

### 最大值

```javascript
const max1 = (arr) => Math.max(...arr);
const max2 = (arr) => arr.sort((a, b) => a - b)[arr.length - 1];
const max3 = (arr) => Math.max.apply(Math, arr);
```

### 最小值

```javascript
const min1 = (arr) => Math.min(...arr);
const min2 = (arr) => arr.sort((a, b) => a - b)[0];
const min3 = (arr) => Math.min.apply(Math, arr);
```

## 数组扁平化

```typescript
const flatten = <T>(arr: Array<T>): Array<T> => {
  let result = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (Array.isArray(element)) {
      result = result.concat(flatten(element));
    } else {
      result.push(element);
    }
  }

  return result;
};
```

```typescript
const flatten = <T>(arr: Array<T>): T[] => arr.flat(Infinity);
```

```typescript
const flatten = <T>(arr: Array<T>): T[] => {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
};
```

## 数组扁平化、去重、排序

```typescript
// 数组扁平化
const flatten = (arr: any[]): any[] => arr.flat(Infinity);
// 排序
const sort = (arr: any[]): any[] => arr.sort((a, b) => a - b);
// 去重
const unique = (arr: any[]): any[] => [...new Set(arr)];

const compose =
  (...fns: Function[]) =>
  (initValue) =>
    fns.reduceRight((prev, cur) => cur(prev), initValue);

console.log(
  compose([[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10])
); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
```

```javascript
const flatter = (arr) => {
  if (!arr.length) return;
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};
```

## findIndex

> [JavaScript 专题之学 underscore 在数组中查找指定元素](https://github.com/mqyqingfeng/Blog/issues/37)

```typescript
function findIndex(array: unknown[], predicate: Function, context = null) {
  const length = array.length;

  for (let index = 0; index < length; index++) {
    if (predicate.call(context, array[index], index, array)) return index;
  }

  return -1;
}
```

## findLastIndex

```typescript
function findLastIndex(array: unknown[], predicate: Function, context = null) {
  const length = array.length;
  for (let index = length - 1; index >= 0; index--) {
    if (predicate.call(context, array[index], index, array)) return index;
  }

  return -1;
}
```

## createIndexFinder

利用传参的不同，在同一个循环中，实现正序和倒序遍历。

```typescript
type Dir = 1 | -1;
const createIndexFinder = (dir: Dir) => {
  return function (array: unknown[], predicate: Function, context = null) {
    const length = array.length;
    let index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate.call(context, array[index], index, array)) return index;
    }
    return -1;
  };
};

const findIndex = createIndexFinder(1);
const findLastIndex = createIndexFinder(-1);

console.log(findIndex([1, 2, 4, 5], (item) => item >= 2)); // 1
console.log(findLastIndex([1, 2, 4, 5], (item) => item >= 2)); // 3
```

## sortedIndex

```typescript
const sortedIndex = <T>(
  array: T[],
  param: T,
  iterate: Function,
  context = null
) => {
  function cb(fn: Function, context = null) {
    return function (...reset) {
      return fn.apply(context, reset);
    };
  }

  iterate = cb(iterate, context);

  let start = 0,
    end = array.length;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (iterate(array[mid]) < iterate(param)) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return end;
};

let stooges = [
  { name: "stooge1", age: 10 },
  { name: "stooge2", age: 30 },
];
let result = sortedIndex(
  stooges,
  { name: "stooge3", age: 20 },
  function (stooge) {
    return stooge.age;
  }
);

console.log(result); // 1
```

## indexOf / lastIndexOf

### 第一版本

```typescript
const createIndexOf = (dir: 1 | -1) => {
  return function (array: unknown[], item: unknown, idx?: number) {
    let length = array.length;
    let index = 0;
    if (typeof idx === "number") {
      if (dir > 0) {
        index = idx >= 0 ? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length - 1;
      }
    }
    for (
      idx = dir > 0 ? index : length - 1;
      idx >= 0 && idx < length;
      idx += dir
    ) {
      if (array[idx] === item) return idx;
    }

    return -1;
  };
};

const myIndexOf = createIndexOf(1);
const myLastIndexOf = createIndexOf(-1);

console.log(myIndexOf([5, 2, 3, 4, 5], 5)); // 0
console.log(myLastIndexOf([5, 2, 3, 4, 5], 5)); // 4
```

### 终版

1. 可以判断 NaN
2. 支持有序数组的二分查找

```typescript
// findIndex sortedIndex findLastIndex 分别是上面完成的函数

const createIndexOf = (
  dir: 1 | -1,
  predicate: Function,
  sortedIndex?: Function
) => {
  return function (array: unknown[], item: unknown, idx?: number) {
    let length = array.length;
    let index = 0;
    if (typeof idx === "number") {
      if (dir > 0) {
        index = idx >= 0 ? idx : Math.max(length + idx, 0);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length - 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }
    // 判断是否是 NaN
    if (item !== item) {
      idx = predicate(array.slice(index, length), isNaN);
      // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
      return idx >= 0 ? idx + index : -1;
    }
    for (
      idx = dir > 0 ? index : length - 1;
      idx >= 0 && idx < length;
      idx += dir
    ) {
      if (array[idx] === item) return idx;
    }

    return -1;
  };
};

const myIndexOf = createIndexOf(1, findIndex, sortedIndex);
const myLastIndexOf = createIndexOf(-1, findLastIndex);

console.log(myIndexOf([5, 2, 3, NaN, 5], NaN)); // 0
console.log(myLastIndexOf([5, 2, 3, 4, 5], 5)); // 4
```

## 判断两个对象是否相同

> [JavaScript 专题之如何判断两个对象相等](https://github.com/mqyqingfeng/Blog/issues/41)

```typescript
const objectToString = Object.prototype.toString;
const toRawType = (val: unknown): string =>
  objectToString.call(val).slice(8, -1);
const isFunction = (val) => toRawType(val) === "Function";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const map = new Map([
  ["RegExp", (a, b) => a + "" === b + ""],
  ["String", (a, b) => a + "" === b + ""],
  [
    "Number",
    (a, b) => {
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / +b : +a === +b;
    },
  ],
  ["Date", (a, b) => +a === +b],
  ["Boolean", (a, b) => +a === +b],
  [
    "Array",
    (a, b, aStack = [], bStack = []) => {
      let length = a.length;
      if (length !== b.length) return false;
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
        return true;
      }
    },
  ],
  [
    "Object",
    (a, b, aStack = [], bStack = []) => {
      let keys = Object.keys(a),
        length = keys.length;
      if (length !== Object.keys(b).length) return false;
      while (length--) {
        let key = keys[length];
        if (!hasOwnProperty.call(b, key) && eq(a[key], b[key], aStack, bStack))
          return false;
        return true;
      }
    },
  ],
]);
const deepEq = (a: unknown, b: unknown, aStack = [], bStack = []): boolean => {
  const ATypeName = toRawType(a);
  const BTypeName = toRawType(b);
  if (ATypeName !== BTypeName) return false;

  let length = aStack.length;
  // 检查是否有循环引用
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }

  aStack.push(a);
  bStack.push(b);

  if (map.get(ATypeName)) return map.get(ATypeName)(a, b);

  const areArrays = ATypeName === "Array";

  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != "object" || typeof b != "object") return false;

    var aCtor = a.constructor,
      bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
    if (
      aCtor !== bCtor &&
      !(
        isFunction(aCtor) &&
        aCtor instanceof aCtor &&
        isFunction(bCtor) &&
        bCtor instanceof bCtor
      ) &&
      "constructor" in a &&
      "constructor" in b
    ) {
      return false;
    }
  }

  aStack.pop();
  bStack.pop();

  return true;
};

const eq = (a: unknown, b: unknown, aStack = [], bStack = []): boolean => {
  // 区分出 +0 和 -0
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  // 为了 null 的情况尽早退出函数
  if (a == null || b == null) {
    return false;
  }
  // 判断 NaN NaN 不等于自身
  if (a !== a) return b !== b;

  // 判断参数 a 类型，如果是基本类型，这里直接返回 false
  const AType = typeof a;
  if (AType !== "function" && AType !== "object" && typeof b !== "object")
    return false;

  // 复杂的对象使用 deepEq 函数进行深度比较
  return deepEq(a, b);
};

console.log(eq([1], [1])); // true
console.log(
  eq({ value: 1, name: [1, 2, 3, 44] }, { value: 1, name: [1, 2, 3, 44] })
); // true

let a = { foo: { b: { foo: { c: { foo: null } } } } };
let b = { foo: { b: { foo: { c: { foo: null } } } } };
a.foo.b.foo.c.foo = a;
b.foo.b.foo.c.foo = b;
console.log(eq(a, b)); // true
```

## 函数柯里化

> [JavaScript 专题之函数柯里化](https://github.com/mqyqingfeng/Blog/issues/42)

### easy

```javascript
const curry = (fn, ...reset) => {
  const args = reset;

  return function (...reset) {
    return fn.apply(this, [].concat.call(args, reset));
  };
};

// demo
const addCurry = curry(add, 1, 2);
console.log(addCurry()); // 3
//或者
const addCurry1 = curry(add, 1);
console.log(addCurry1(2)); // 3
//或者
const addCurry2 = curry(add);
console.log(addCurry2(1, 2)); // 3
```

### medium

```javascript
const subCurry = function (fn, ...reset) {
  const args = reset;

  return function (...reset) {
    return fn.apply(this, [].concat.call(args, reset));
  };
};

const curry = (fn, length = 0) => {
  length = length || fn.length; // 初始状态下是函数参数的长度

  return function (...reset) {
    if (reset.length < length) {
      const combined = [fn].concat(reset);

      return curry(subCurry.apply(this, combined), length - reset.length);
    } else {
      return fn.apply(this, reset);
    }
  };
};

// demo
const fn = curry(function (a, b, c) {
  return [a, b, c];
});

console.log(fn("a", "b", "c")); // [ 'a', 'b', 'c' ]
console.log(fn("a", "b")("c")); // [ 'a', 'b', 'c' ]
console.log(fn("a")("b")("c")); // [ 'a', 'b', 'c' ]
console.log(fn("a")("b", "c")); // [ 'a', 'b', 'c' ]
```

### hard

```typescript
const curry = (fn: Function, args: unknown[] = [], holes: unknown[] = []) => {
  length = fn.length;

  return function () {
    let _args = args.slice(0),
      _holes = holes.slice(0),
      argsLen = args.length,
      holesLen = holes.length,
      arg,
      i,
      index = 0;

    for (i = 0; i < arguments.length; i++) {
      let arg = arguments[i];

      if (arg === "_" && holesLen) {
        index++;
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen);
        }
      } else if (arg === "_") {
        _args.push(arg);
        _holes.push(argsLen + i);
      } else if (holesLen) {
        if (index >= holesLen) {
          _args.push(arg);
        } else {
          _args.splice(_holes[index] as number, 1, arg);
          _holes.splice(index, 1);
        }
      } else {
        _args.push(arg);
      }
    }
    if (_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    } else {
      return fn.apply(this, _args);
    }
  };
};

var fn = curry(function (a, b, c, d, e) {
  console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
// fn(1, 2, 3, 4, 5);
// fn('_', 2, 3, 4, 5)(1);
// fn(1, '_', 3, 4, 5)(2);
// fn(1, '_', 3)('_', 4)(2)(5);
// fn(1, '_', '_', 4)('_', 3)(2)(5);
// fn('_', 2)('_', '_', 4)(1)(3)(5)
```

### hard

> [JavaScript 专题之偏函数](https://github.com/mqyqingfeng/Blog/issues/43)

```typescript
const partial = (fn: Function, ...reset: unknown[]) => {
  let args = reset;
  return function (...reset) {
    let position = 0,
      len = args.length;
    for (let index = 0; index < len; index++) {
      args[index] = args[index] === "_" ? reset[position++] : args[index];
    }
    while (position < reset.length) {
      args.push(reset[position++]);
    }
    return fn.apply(this, args);
  };
};

// demo
const subtract = function (a, b) {
  return b - a;
};
subFrom20 = partial(subtract, "_", 20);
subFrom20(5);
console.log(subFrom20(5)); //15
```

## 惰性函数

> [JavaScript 专题之惰性函数](https://github.com/mqyqingfeng/Blog/issues/44)

```javascript
var foo = function () {
  var t = new Date();
  foo = function () {
    return t;
  };
  return foo();
};

// 下面的值全部相同
console.log(+foo());
console.log(+foo());
console.log(+foo());
console.log(+foo());
```

DOM 监听事件

```javascript
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false);
    };
  } else if (window.attachEvent) {
    addEvent = function (type, el, fn) {
      el.attachEvent("on" + type, fn);
    };
  }

  addEvent(type, el, fn);
}
```

```javascript
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    el.addEventListener(type, fn, false);
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false);
    };
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, fn);
    addEvent = function (type, el, fn) {
      el.attachEvent("on" + type, fn);
    };
  }
}
```

## 函数组合

> [JavaScript 专题之函数组合](https://github.com/mqyqingfeng/Blog/issues/45#)

### underscore 中的 compose 函数

```javascript
const compose = (...reset) => {
  const args = reset;
  const start = args.length - 1;
  return function () {
    let i = start;
    let result = args[start].apply(this, arguments);
    while (i--) {
      result = args[i].call(this, result);
    }
    return result;
  };
};
```

### redux

```javascript
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
```

## 乱序

> [JavaScript 专题之乱序](https://github.com/mqyqingfeng/Blog/issues/51)

```typescript
const shuffle = (arr: unknown[]): unknown[] => {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }

  return arr;
};
```

## 用 setTimeout 实现 setInterval

```typescript
const mySetInterval = (fn: Function, delay: number) => {
  let timer: null | ReturnType<typeof setTimeout> = null;
  let interval = () => {
    fn();
    timer = setTimeout(interval, delay);
  };

  interval();

  return {
    cancel: () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    },
  };
};
```

## 使用 setInterval 实现 seTimeout

```typescript
const mySetTimeout = function (fn: Function, delay: number) {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, delay);
};
```

## 订阅发布者模式

```typescript
class EventEmitter {
  handlers: object;
  constructor() {
    // handlers 是一个 map 用于存储事件与回调之间的对应关系
    this.handlers = {};
  }
  // 安装事件监听器，接受目标事件名和回调函数作为参数
  on(eventName, cb: Function) {
    if (!this.handlers[eventName]) {
      // 如果没有，就先初始化一个监听函数队列
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(cb);
  }
  // emit 用于触发事件，接受事件名称和监听函数入参作为参数
  emit(eventName, ...reset: unknown[]) {
    if (this.handlers[eventName]) {
      // 对 this.handlers[eventName] 进行一次浅拷贝
      // 主要目的地是避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = this.handlers[eventName].slice();
      handlers.forEach((cb) => {
        cb(...reset);
      });
    }
  }
  // 移除某个回调函数队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
  // 为事件注册单词回调函数
  once(eventName, cb) {
    const wrapper = (...reset: unknown[]) => {
      cb(...reset);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}

const event1 = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event1.on("click", handle);

event1.emit("click", 1, 2, 3, 4); // [ 1, 2, 3, 4 ]

event1.off("click", handle);

event1.emit("click", 1, 2); // 不输出

event1.once("dbClick", () => {
  console.log(123456);
});

event1.emit("dbClick"); // 123456
event1.emit("dbClick"); // 不输出
```

## forEach

> [forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

```typescript
Array.prototype.myForEach = function (cb: Function, thisArg = window) {
  if (this === null || this === undefined) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof cb !== "function") throw new TypeError(cb + " is not a function");
  const arr = this;
  for (let index = 0; index < arr.length; index++) {
    // 执行回调函数
    cb.call(thisArg, arr[index], index, arr);
  }
};
```

## map

> [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```typescript
Array.prototype.myMap = function (cb: Function, thisArg = window) {
  const arr = this;
  const res = [];

  for (let index = 0; index < arr.length; index++) {
    res.push(cb.call(thisArg, arr[index], index, arr));
  }

  return res;
};
```

## reduce

> [reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```javascript
Array.prototype.myReduce = function (cb: Function, initValue) {
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.reduce " + "called on null or undefined"
    );
  }

  if (typeof cb !== "function") {
    throw new TypeError(`${cb} is not a Function`);
  }

  let accumulator = initValue;
  let arr = this;
  let index = 0;

  if (accumulator === undefined) {
    accumulator = arr[index];
    index++;
  }

  for (; index < arr.length; index++) {
    accumulator = cb(accumulator, arr[index], index, arr);
  }
  return accumulator;
};
```

## every

> [every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

```typescript
Array.prototype.myEvery = function (cb: Function, thisArg = window) {
  if (this == null) {
    throw new TypeError("Array.prototype.some called on null or undefined");
  }

  if (typeof cb !== "function") {
    throw new TypeError();
  }

  const arr = this;
  let flag = true;

  for (let index = 0; index < arr.length; index++) {
    if (!cb.call(thisArg, arr[index], index, arr)) return false;
  }

  return flag;
};
```

## some

> [some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

```typescript
Array.prototype.mySome = function (cb: Function, thisArg = window) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof cb !== "function") {
    throw new TypeError();
  }

  const arr = this;
  const flag = false;

  for (let index = 0; index < arr.length; index++) {
    if (cb.call(thisArg, arr[index], index, arr)) {
      return true;
    }
  }
  return flag;
};
```

## find

> [find](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

```typescript
Array.prototype.myFind = function (cb: Function, thisArg = null) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof cb !== "function") {
    throw new TypeError();
  }

  const arr = this;
  for (let index = 0; index < arr.length; index++) {
    if (cb.call(thisArg, arr[index], index, arr)) return arr[index];
  }
  return undefined;
};
```

## findIndex

> [findIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

```typescript
Array.prototype.myFindIndex = function (cb: Function, thisArg = null) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof cb !== "function") {
    throw new TypeError();
  }

  const arr = this;
  for (let index = 0; index < arr.length; index++) {
    if (cb.call(thisArg, arr[index], index, arr)) return index;
  }
  return -1;
};
```

## indexOf

> [indexOf](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

```typescript
Array.prototype.myIndexOf = function (val, beginIndex = 0) {
  if (this.length < 1) {
    return -1;
  }

  const arr = this;
  beginIndex = beginIndex <= 0 ? 0 : beginIndex;

  for (let index = beginIndex; index < arr.length; index++) {
    if (val === arr[index]) return index;
  }

  return -1;
};
```

## dom2json

> [dom2json](https://juejin.cn/post/7020562888657993741#heading-9)

```javascript
const dom2json = (rootDom) => {
  if (!rootDom) return;

  let rootObj = {
    tagName: rootDom.tagName,
    children: [],
  };

  const children = rootDom.children;

  if (children && children.length) {
    [...children].forEach((el, index) => {
      rootObj.children[index] = dom2json(el);
    });
  }

  return rootObj;
};
```

## 链式调用

> [参考链接](https://github.com/lgwebdream/FE-Interview/issues/22)

链式调用的核心就在于调用完的方法将自身实例返回

```javascript
function Class1() {
  console.log("初始化");
}

Class1.prototype.method = function (param) {
  console.log(param); // 第一次调用 第二次链式调用 第三次链式调用
  return this;
};

let cl = new Class1();
cl.method("第一次调用").method("第二次链式调用").method("第三次链式调用");
```

## 数组转树

> [参考链接](https://github.com/lgwebdream/FE-Interview/issues/35)

```typescript
interface INode {
  id: number;
  val: string;
  parentId: null | number;
}

let arr: INode[] = [
  {
    id: 1,
    val: "学校",
    parentId: null,
  },
  {
    id: 2,
    val: "班级1",
    parentId: 1,
  },
  {
    id: 3,
    val: "班级2",
    parentId: 1,
  },
  {
    id: 4,
    val: "学生1",
    parentId: 2,
  },
  {
    id: 5,
    val: "学生2",
    parentId: 3,
  },
  {
    id: 6,
    val: "学生3",
    parentId: 3,
  },
];

function arrayToTree(arr, parentId) {
  const array = [];

  function buildTree(arr, parentId, childrenArray) {
    arr.forEach((item) => {
      if (item.parentId === parentId) {
        item.children = [];
        buildTree(arr, item.id, item.children);
        childrenArray.push(item);
      }
    });
  }

  buildTree(arr, parentId, array);
  return array.length > 0 ? (array.length > 1 ? array : array[0]) : {};
}

console.log(arrToTree(arr, null));
```

```typescript
interface INode {
  id: number;
  val: string;
  parentId: number;
}

interface TreeNode {
  id: number;
  val: string;
  parentId: number;
  children?: TreeNode[];
}

let arr: INode[] = [
  {
    id: 1,
    val: "学校",
    parentId: null,
  },
  {
    id: 2,
    val: "班级1",
    parentId: 1,
  },
  {
    id: 3,
    val: "班级2",
    parentId: 1,
  },
  {
    id: 4,
    val: "学生1",
    parentId: 2,
  },
  {
    id: 5,
    val: "学生2",
    parentId: 3,
  },
  {
    id: 6,
    val: "学生3",
    parentId: 3,
  },
];

const listToTree = (arr: INode[]): ITreeNode | undefined => {
  const map = arr.reduce<Map<number, ITreeNode>>((prev, curr) => {
    prev.set(curr.id, { ...curr, children: [] });
    return prev;
  }, new Map());

  map.forEach((item) => {
    const parent = map.get(item.parentId as number);
    if (parent) parent.children?.push(item);
  });
  return map.get(1);
};
```

## 树转数组

```javascript
const tree2List = (tree) => {
  let res = [];
  let queue = [...tree];

  while (queue.length) {
    const node = queue.shift();
    const children = node.children;
    if (children.length) {
      queue.push(...children);
    }
    delete node.children;
    res.push(node);
  }

  return res;
};
```

## 把一个 JSON 对象的 key 从下划线形式（Pascal）转换到小驼峰形式（Camel）

> [参考链接](https://github.com/zcxiaobao/everyday-insist/blob/master/21interview/baseJS/_tocamel.md)

```typescript
const camelizeRE = /_(\w)/g;
const camelize = (str: string): string => {
  return str.replace(/_(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
};

console.log(camelize("on_click")); // onClick
```

## sleep 函数

```typescript
const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

sleep(1000).then(() => console.log("111 :>> ", 111));
```

## sum

```typescript
const sum = (...reset: number[]) => {
  let args = reset;
  let result = 0;

  result = args.reduce((pre, cur) => {
    pre += cur;
    return pre;
  }, 0);

  const add = function (...reset: number[]) {
    result = reset.reduce((pre, cur) => {
      pre += cur;
      return pre;
    }, result);

    return add;
  };

  add.sumOf = () => result;

  return add;
};

console.log(sum(1, 2, 3).sumOf()); // 6
console.log(sum(2, 3)(2).sumOf()); // 7
console.log(sum(1, 2)(3).sumOf()); // 6
```

## composePromise

```typescript
const sleep = (timer) => new Promise((resolve) => setTimeout(resolve, timer));

const composePromise = (...fns) => {
  return function (...rest) {
    return fns.reduceRight((pre, cur) => {
      return pre.then(cur);
    }, Promise.resolve(rest));
  };
};

const fn1 = (...rest) => {
  return new Promise((resolve) => {
    sleep(5_000).then(() => {
      console.log(rest[0]);
      resolve("success-end");
    });
  });
};

const fn2 = () => {
  return new Promise((resolve) => {
    sleep(1_000).then(() => {
      console.log("fn2");
      resolve("fn1");
    });
  });
};

const fn = composePromise(fn1, fn2);
fn("fn2").then((res) => {
  console.log(res);
});
// fn2 fn1 success-end
```

## 手写 Promise.all

```javascript
function pAll(_promises) {
  return new Promise((resolve, reject) => {
    const promises = [..._promises];
    const result = [];
    const len = promises.length;
    let count = 0;

    promises.forEach((item) => {
      Promise.resolve(item)
        .then((res) => {
          result.push(res);
          if (++count === len) resolve(result);
        })
        .catch((reason) => reject(reason));
    });
  });
}

const sleep = function (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

pAll([1, 2, 3]).then((res) => console.log(res)); // [1, 2, 3]
pAll([1, Promise.resolve(3)]).then((res) => console.log(res)); // [1, 3]
pAll([1, Promise.reject(2)]).catch((err) => console.log("err :>> ", err)); // 2
Promise.all([1, Promise.reject(2)]).catch((err) =>
  console.log("err :>> ", err)
); // 2
pAll([sleep(1000), sleep(1000), sleep(1000)]).then(() =>
  console.log("sleep done")
); // 一秒后直接输出 sleep done
```

## 手写 Promise.race

```javascript
function pRace(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      Promise.resolve(item)
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  });
}

const sleep = function (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const sleep1 = sleep(1_0000).then(() => "sleep1");
const sleep2 = sleep(2_0000).then(() => "sleep2");
const sleep3 = sleep(3_000).then(() => "sleep3");

Promise.race([sleep1, sleep2, sleep3]).then((data) =>
  console.log("data :>> ", data)
); // sleep3
pRace([sleep1, sleep2, sleep3]).then((data) => console.log("data :>> ", data)); // sleep3
```

## Promise.allSettled

```javascript
function pAllSettled(promiseArr) {
  let result = [];
  const len = promiseArr.length;
  return new Promise((resolve) => {
    promiseArr.forEach((data) => {
      Promise.resolve(data)
        .then((value) => {
          result.push({
            status: "fulfilled",
            value,
          });
          if (result.length === len) resolve(result);
        })
        .catch((reason) => {
          result.push({
            status: "rejected",
            reason,
          });
          if (result.length === len) resolve(result);
        });
    });
  });
}
pAllSettled([sleep3, sleep2, sleep1]).then((res) =>
  console.log("res :>> ", res)
);

// [ { status: 'fulfilled', value: 'sleep1' },
// { status: 'fulfilled', value: 'sleep2' },
// { status: 'fulfilled', value: 'sleep3' } ]
```

## Promise.any

```javascript
function pAny(promiseArr) {
  let count = 0;
  const len = promiseArr.length;
  return new Promise((resolve, reject) => {
    if (!len) return;
    promiseArr.forEach((item) => {
      Promise.resolve(item)
        .then((data) => resolve(data))
        .catch((reason) => {
          if (++count === len)
            reject(new AggregateError("All promise were rejected"));
        });
    });
  });
}
```

## 字符串模板

> [参考链接](https://juejin.cn/post/6946022649768181774#heading-11)

```typescript
const person = {
  name: "nineNan",
  age: 18,
};

const render = function (template: string, data) {
  const RE = /\{\{(\w+)\}\}/;
  if (RE.test(template)) {
    const name = RE.exec(template)[1];
    template = template.replace(RE, data[name]);
    return render(template, data);
  }

  return template;
};

const template = "我是{{name}}，年龄{{age}}, 性比{{sex}}";
console.log(render(template, person)); // 我是nineNan，年龄18, 性比undefined
```

## Object.assign

```typescript
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val: object, key: string | Symbol): key is keyof typeof val =>
  hasOwnProperty.call(val, key);

Object.prototype.myAssign = function (target, ...source) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  let ret = Object(target);
  source.forEach(function (obj) {
    if (obj != null) {
      for (let key in obj) {
        if (hasOwn(obj, key)) {
          ret[key] = obj[key];
        }
      }
    }
  });
  return ret;
};
```

## Object.create()

> [参考链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

```javascript
Object.create2 = function (proto, propertiesObject = undefined) {
  if (typeof proto !== "function" && typeof proto !== "object") {
    throw new TypeError("Object prototype may only be an Object: " + proto);
  }
  if (proto === null) {
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
    );
  }
  if (typeof propertiesObject !== "undefined") {
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support a second argument."
    );
  }

  function F() {}
  F.prototype = proto;
  return new F();
};
```

## Object.entries()

```javascript
const hasOwn = Object.prototype.hasOwnProperty;
Object.prototype.myEntries = function (obj) {
  let res = [];
  for (const key in obj) {
    if (hasOwn.call(obj, key)) {
      res.push([key, obj[key]]);
    }
  }
  return res;
};
```

```javascript
if (!Object.entries) {
  Object.myEntries = function (obj) {
    let ownProps = Object.keys(obj),
      len = ownProps.length,
      resArr = new Array(len);
    while (len--) {
      resArr[len] = [ownProps[len], obj[ownProps[len]]];
    }

    return resArr;
  };
}
```

## 实现有并行限制的 Promise

> [参考链接](https://juejin.cn/post/7018337760687685669)

```typescript
/*
JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。
完善下面代码的Scheduler类，使以下程序能够正常输出：
class Scheduler {
  add(promiseCreator) { ... }
  // ...
}
   
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  }
})
  
const scheduler = new Scheduler()
  
const addTask = (time,order) => {
  scheduler.add(() => timeout(time).then(()=>console.log(order)))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// output: 2 3 1 4
整个的完整执行流程：

起始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4
*/

class Scheduler {
  queue: any[];
  maxCount: number;
  runCount: number;
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCount = 0;
  }

  add(promiseCreator) {
    this.queue.push(promiseCreator);
    this.runQueue();
  }

  runQueue() {
    if (this.queue.length && this.runCount < this.maxCount) {
      const promiseFn = this.queue.shift();
      // 开始执行任务 runCount ++
      this.runCount++;
      // 执行回调函数
      promiseFn().then((result) => {
        // 函数完毕 runCount --
        this.runCount--;
        // 执行下一次函数
        this.runQueue();
      });
    }
  }
}

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// 输出 2314
```

## trim

> [参考链接](https://juejin.cn/post/7018337760687685669#heading-20)

```typescript
let str = " NineNan ";

console.log(str.trimStart().trimEnd()); // NineNan
const trim = (str: string) => str.replace(/^\s*|\s*$/g, "");
console.log(trim(str)); // NineNan
```

## 千分位格式化数字

> [参考链接](https://juejin.cn/post/7018337760687685669#heading-41)

```typescript
const formatMoney = function (num: number): string {
  return (num + "").indexOf(".") !== -1
    ? num.toLocaleString()
    : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};

const formatPrice = (number) => {
  number = "" + number;
  const [integer, decimal = ""] = number.split(".");
  return (
    integer.replace(/\B(?=(\d{3})+$)/g, ",") + (decimal ? "." + decimal : "")
  );
};
```

## 实现 lazyMan 函数

> [参考链接](https://juejin.cn/post/7023906112843808804#heading-47)

```
实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
```

```typescript
class LazyMan {
  tasks: Array<Function>;
  task: Function;

  constructor(name: string) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi this is ${name}`);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.tasks.shift();
    task && task();
  }

  sleep(time: number) {
    this.sleepWrapper(time, false);
    return this;
  }

  sleepFirst(time: number) {
    this.sleepWrapper(time, true);
    return this;
  }

  sleepWrapper(time: number, isFirst: boolean) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1_000);
    };
    if (isFirst) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }

  eat(food: string) {
    const task = () => {
      console.log(`Eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}

// 测试
const lazyMan = (name) => new LazyMan(name);
lazyMan("Hank").sleep(1).eat("dinner");
lazyMan("Hank").eat("dinner").eat("supper");
lazyMan("Hank").eat("supper").sleepFirst(5);
```

### await-to-js

> [源码地址](https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts)

```typescript
const to = <T, U = Error>(promise: Promise<T>, errorExt?: object) => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
};
```
