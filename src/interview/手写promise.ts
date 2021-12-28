// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
type Status = "PENDING" | "FULFILLED" | "REJECTED";
type Resolve = (val: unknown) => void;
type Reject = (val?: any) => void;

class MyPromise {
  constructor(executor: Function) {
    // executor 是一个执行器，进入会立即执行
    // 捕获执行器中的代码，如果执行器中有代码错误，Promise 的状态要变成失败
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      // 如果有错误，直接执行 reject
      this.reject(err);
    }
  }
  // 储存状态的变量，初始值是 pending
  status: Status = PENDING;
  // resolve 和 reject 使用箭头函数的话可以让 this 指向当前实例
  // 如果是普通函数的话 直接调用 this 指向 window 或 undefined

  // 成功之后的返回值
  value = null;
  // 存储成功的回调函数
  onFulfilledCallbacks: Function[] = [];

  // 失败之后的返回值
  reason: unknown | null = null;
  // 存储失败的回调函数
  onRejectedCallbacks: Function[] = [];

  // 更改成功之后的状态
  resolve: Resolve = (value: any) => {
    // 只有状态是 pending，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成之后的值
      this.value = value;
      // 判断成功回调是否存在，存在就调用
      while (this.onFulfilledCallbacks.length) {
        (this.onFulfilledCallbacks.shift() as Function)(value);
      }
    }
  };

  // 更改失败之后的状态
  reject: Reject = (reason: unknown) => {
    if (this.status === PENDING) {
      // 状态变为失败
      this.status = REJECTED;
      // 保存失败的原因
      this.reason = reason;
      // 判断失败回调是否存在，如果存在就调用
      while (this.onRejectedCallbacks.length) {
        (this.onRejectedCallbacks.shift() as Function)(reason);
      }
    }
  };

  // then 方法要链式调用那么就需要返回一个 Promise 对象
  // then 方法里面 return 一个返回值作为下一个 then 方法的参数，
  // 如果是 return 一个 Promise 对象，那么就需要判断它的状态
  then(onFulfilled: Function, onRejected: Function) {
    // 为了链式调用 直接返回一个 promise，并 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        // 调用成功回调，返回值
        // 这里需要创建微任务，必须等待 promise2 完成初始化
        queueMicrotask(() => {
          // 捕获 then 执行时候的错误
          try {
            const x = onFulfilled(this.value);
            // 将 promise2 传入
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === REJECTED) {
        // 调用失败回调，返回值
        onRejected(this.reason);
      }

      if (this.status === PENDING) {
        // 因为不清楚后面的状态，因此先将成功和失败的回调函数全部存储起来
        // 等到执行的成功失败额函数时候再传递
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等，说明 return 的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

export default MyPromise;
