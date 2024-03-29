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

function isFun(params: unknown): params is Function {
  return typeof params === "function";
}
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
  then(onFulfilled: Function | null, onRejected?: Function) {
    // 如果不传参数，就使用默认值
    const onRealFulfilled = isFun(onFulfilled)
      ? onFulfilled
      : (value: any) => value;
    const onRealRejected = isFun(onRejected)
      ? onRejected
      : (reason: any) => {
          throw reason;
        };
    // 为了链式调用 直接返回一个 promise，并 return 出去
    const promise2 = new MyPromise((resolve: Resolve, reject: Reject) => {
      // 成功执行函数
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onRealFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      // 失败执行函数
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRealRejected(this.reason);

            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 判断状态
      if (this.status === FULFILLED) {
        // 调用成功回调，返回值
        // 这里需要创建微任务，必须等待 promise2 完成初始化
        fulfilledMicrotask();
      }

      if (this.status === REJECTED) {
        // 调用失败回调，返回值
        rejectedMicrotask();
      }

      if (this.status === PENDING) {
        // 因为不清楚后面的状态，因此先将成功和失败的回调函数全部存储起来
        // 等到执行的成功失败额函数时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    return promise2;
  }

  // resolve 静态方法
  static resolve(parameter: any) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    // 转换成常规的写法
    return new MyPromise((resolve: Resolve) => {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject(reason: Reject) {
    return new MyPromise((resolve: Resolve, reject: Reject) => {
      reject(reason);
    });
  }

  // all
  static all(promiseArr: unknown[]) {
    return new MyPromise((resolve: Resolve, reject: Reject) => {
      let result: any[] = [];
      let count = 0;
      const len = promiseArr.length;
      for (let index = 0; index < len; index++) {
        MyPromise.resolve(promiseArr[index]).then(
          (val: any) => {
            result[index] = val;
            if (++count === len) resolve(result);
          },
          (reason: any) => reject(reason)
        );
      }
    });
  }

  // catch
  catch(onRejected: Function) {
    // 只需要进行错误的处理
    this.then(null, onRejected);
  }
}

function resolvePromise(
  promise2: MyPromise,
  x: any,
  resolve: Resolve,
  reject: Reject
) {
  // 如果相等，说明 return 的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  if (typeof x === "object" || typeof x === "function") {
    // null 直接返回
    if (x === null) return resolve(x);

    let then;

    try {
      // 把 x.then 赋值给 then
      then = x.then;
    } catch (error) {
      // 如果 x.then 的值抛出错误 error 则以 error 为原因拒绝 promise
      return reject(error);
    }

    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          (y) => {
            // 如果 resolvePromise 和 rejectPromise 都没调用，或者被同一参数调用多次，则优先采用首次调用并忽略剩下的调用
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          // 如果 rejectPromise 以拒因 r 为参数被调用，则已拒因 r 拒绝 promise
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果 then 的方法抛出了异常 error，如果 resolvePromise 或 rejectPromise 已经被调用，则直接返回
        if (called) return;
        // 否则 reject
        reject(error);
      }
    } else {
      // 如果不是函数，以 x 为参数返回 Promise
      resolve(x);
    }
  } else {
    // 如果 x 不是函数和对象，以 x 为参数返回 Promise
    resolve(x);
  }
}
MyPromise.deger = MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise;

/** demo */
// const promise = new Promise((resolve, reject) => {
//    resolve('success')
//    reject('err')
// })

// promise.then(value => {
//   console.log('resolve', value)
// }, reason => {
//   console.log('reject', reason)
// })

/** demo */
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 2000);
// })

// promise.then(value => {
//   console.log('resolve', value)
// }, reason => {
//   console.log('reject', reason)
// })

/** demo */
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 2000);
// })

// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// })

// promise.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

// promise.then(value => {
//   console.log(3)
//   console.log('resolve', value)
// })

/** demo */
// then 方法要链式调用那么就需要返回一个 Promise 对象
// then 方法里面 return 一个返回值作为下一个 then 方法的参数，
// 如果是 return 一个 Promise 对象，那么就需要判断它的状态

/** demo */
// const promise = new MyPromise((resolve, reject) => {
//   // 目前这里只处理同步的问题
//   resolve('success')
// })

// function other () {
//   return new MyPromise((resolve, reject) =>{
//     resolve('other')
//   })
// }
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   return other()
// }).then(value => {
//   console.log(2)
//   console.log('resolve', value)
// })

/** demo */
// 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
// const promise = new MyPromise((resolve, reject) => {
//     resolve('success')
// })

// // 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
// const p1 = promise.then(value => {
//    console.log(1)
//    console.log('resolve', value)
//    return p1
// })

// // 运行的时候会走reject
// p1.then(value => {
//   console.log(2)
//   console.log('resolve', value)
// }, reason => {
//   console.log(3)
//   console.log(reason.message)
// })

/** demo */
// 捕获执行器中的代码，如果执行器中有代码错误，那么 Promise 的状态要变为失败
// const promise = new MyPromise((resolve, reject) => {
//     throw new Error('执行器错误')
// })

// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// })

// const promise = new MyPromise((resolve, reject) => {
//     resolve('success')
//     // throw new Error('执行器错误')
//  })

// // 第一个then方法中的错误要在第二个then方法中捕获到
// promise.then(value => {
//   console.log(1)
//   console.log('resolve', value)
//   throw new Error('then error')
// }, reason => {
//   console.log(2)
//   console.log(reason.message)
// }).then(value => {
//   console.log(3)
//   console.log(value);
// }, reason => {
//   console.log(4)
//   console.log(reason.message)
// })

/** demo */
// const promise = new Promise((resolve, reject) => {
//   resolve(100)
// })

// promise
//   .then()
//   .then()
//   .then()
//   .then(value => console.log(value))

// const promise = new MyPromise((resolve, reject) => {
//   reject('err')
// })

// promise.then().then().then(value => console.log(value), reason => console.log(reason))

/** demo */
// resolve 和 reject 的静态调用
// MyPromise.resolve().then(() => {
//     console.log(0);
//     return MyPromise.resolve(4);
// }).then((res) => {
//     console.log(res)
// })

// MyPromise.resolve()
//   .then(() => {
//     console.log(0);
//     return MyPromise.reject(4);
//   })
//   .then(
//     (res) => {
//       console.log(res);
//     },
//     (err) => console.log("err :>> ", err)
//   );
