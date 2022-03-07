## await-to-js

> [源码地址](https://github.com/scopsy/await-to-js)

### 为什么使用

ES7 的 async/await 没有提供捕获异常错误的 API，只能通过 try cache 来捕获异常，是的代码语义化不是很好，也会造成回调地狱。

使用 try catch 捕获错误

```javascript
try {
  const res1 = await fn1();
  try {
    const res2 = await fn2();
    try {
      const res3 = await fn3();
    } catch (error3) {
      console.log(error3);
    }
  } catch (error2) {
    console.log(error2);
  }
} catch (error1) {
  console.log(error1);
}
```

使用 await-to-js

```base
npm install await-to-js
```

成功的请求

```typescript
interface IFn1 {
  colors: string;
  age: number;
}

const fn1 = Promise.resolve({
  colors: "black",
  age: 4,
});

const successFn = async () => {
  const [err, data] = await to<IFn1>(fn1); // data 就是成功之后返回的数据
  console.log("data :>> ", data); // { colors: 'black', age: 4 }
};

successFn();
```

抛出错误的请求

```typescript
interface IFn1 {
  colors: string;
  age: number;
}

const fn1 = Promise.reject({
  colors: "black",
  age: 4,
});

const failFn1 = async () => {
  const [err, data] = await to<IFn1>(fn1); // err 就是请求失败之后返回的数据
  console.log("err :>> ", err); // err :>>  { colors: 'black', age: 4 }
};

failFn1();

const failFn2 = async () => {
  // err 就是请求失败之后返回的数据
  // 传递第二个参数可以改变 err 返回的数据
  const [err, data] = await to<IFn1>(fn1, { sex: false });
  console.log("err :>> ", err); // err :>>  { colors: 'black', age: 4, sex: false }
};

failFn2();
```

源码

```typescript
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export default to;
```

### 总结

- await-to-js 是的代码语义化更好
- 开阔了 Promise 的使用方式
