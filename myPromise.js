// // 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// // 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// // 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// // 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// // 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// // 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// const PENDING = "PENDING";
// const FULFILLED = "FULFILLED";
// const REJECTED = "REJECTED";
// function isFun(params) {
//     return typeof params === "function";
// }
// class MyPromise {
//     constructor(executor) {
//         // 储存状态的变量，初始值是 pending
//         this.status = PENDING;
//         // resolve 和 reject 使用箭头函数的话可以让 this 指向当前实例
//         // 如果是普通函数的话 直接调用 this 指向 window 或 undefined
//         // 成功之后的返回值
//         this.value = null;
//         // 存储成功的回调函数
//         this.onFulfilledCallbacks = [];
//         // 失败之后的返回值
//         this.reason = null;
//         // 存储失败的回调函数
//         this.onRejectedCallbacks = [];
//         // 更改成功之后的状态
//         this.resolve = (value) => {
//             // 只有状态是 pending，才执行状态修改
//             if (this.status === PENDING) {
//                 // 状态修改为成功
//                 this.status = FULFILLED;
//                 // 保存成之后的值
//                 this.value = value;
//                 // 判断成功回调是否存在，存在就调用
//                 while (this.onFulfilledCallbacks.length) {
//                     this.onFulfilledCallbacks.shift()(value);
//                 }
//             }
//         };
//         // 更改失败之后的状态
//         this.reject = (reason) => {
//             if (this.status === PENDING) {
//                 // 状态变为失败
//                 this.status = REJECTED;
//                 // 保存失败的原因
//                 this.reason = reason;
//                 // 判断失败回调是否存在，如果存在就调用
//                 while (this.onRejectedCallbacks.length) {
//                     this.onRejectedCallbacks.shift()(reason);
//                 }
//             }
//         };
//         // executor 是一个执行器，进入会立即执行
//         // 捕获执行器中的代码，如果执行器中有代码错误，Promise 的状态要变成失败
//         try {
//             executor(this.resolve, this.reject);
//         }
//         catch (err) {
//             // 如果有错误，直接执行 reject
//             this.reject(err);
//         }
//     }
//     // then 方法要链式调用那么就需要返回一个 Promise 对象
//     // then 方法里面 return 一个返回值作为下一个 then 方法的参数，
//     // 如果是 return 一个 Promise 对象，那么就需要判断它的状态
//     then(onFulfilled, onRejected) {
//         // 如果不穿参数，就使用默认值
//         const onRealFulfilled = isFun(onFulfilled)
//             ? onFulfilled
//             : (value) => value;
//         const onRealRejected = isFun(onRejected)
//             ? onRejected
//             : (reason) => {
//                 throw reason;
//             };
//         // 为了链式调用 直接返回一个 promise，并 return 出去
//         const promise2 = new MyPromise((resolve, reject) => {
//             // 成功执行函数
//             const fulfilledMicrotask = () => {
//                 // 创建一个微任务等待 promise2 完成初始化
//                 queueMicrotask(() => {
//                     try {
//                         // 获取成功回调函数的执行结果
//                         const x = onRealFulfilled(this.value);
//                         // 传入 resolvePromise 集中处理
//                         resolvePromise(promise2, x, resolve, reject);
//                     }
//                     catch (error) {
//                         reject(error);
//                     }
//                 });
//             };
//             // 失败执行函数
//             const rejectedMicrotask = () => {
//                 queueMicrotask(() => {
//                     try {
//                         const x = onRealRejected(this.reason);
//                         resolvePromise(promise2, x, resolve, reject);
//                     }
//                     catch (error) {
//                         reject(error);
//                     }
//                 });
//             };
//             // 判断状态
//             if (this.status === FULFILLED) {
//                 // 调用成功回调，返回值
//                 // 这里需要创建微任务，必须等待 promise2 完成初始化
//                 fulfilledMicrotask();
//             }
//             if (this.status === REJECTED) {
//                 // 调用失败回调，返回值
//                 rejectedMicrotask();
//             }
//             if (this.status === PENDING) {
//                 // 因为不清楚后面的状态，因此先将成功和失败的回调函数全部存储起来
//                 // 等到执行的成功失败额函数时候再传递
//                 this.onFulfilledCallbacks.push(fulfilledMicrotask);
//                 this.onRejectedCallbacks.push(rejectedMicrotask);
//             }
//         });
//         return promise2;
//     }
//     // resolve 静态方法
//     static resolve(parameter) {
//         if (parameter instanceof MyPromise) {
//             return parameter;
//         }
//         // 转换成常规的写法
//         return new MyPromise((resolve) => {
//             resolve(parameter);
//         });
//     }
//     // reject 静态方法
//     static reject(reason) {
//         return new MyPromise((resolve, reject) => {
//             reject(reason);
//         });
//     }
//     // all
//     static all(promiseArr) {
//         return new MyPromise((resolve, reject) => {
//             let result = [];
//             let count = 0;
//             const len = promiseArr.length;
//             for (let index = 0; index < len; index++) {
//                 MyPromise.resolve(promiseArr[index]).then((val) => {
//                     result[index] = val;
//                     if (++count === len)
//                         resolve(result);
//                 }, (reason) => reject(reason));
//             }
//         });
//     }
//     // catch
//     catch(onRejected) {
//         // 只需要进行错误的处理
//         this.then(null, onRejected);
//     }
// }
// function resolvePromise(promise2, x, resolve, reject) {
//     // 如果相等，说明 return 的是自己，抛出类型错误并返回
//     if (promise2 === x) {
//         return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
//     }
//     if (typeof x === "object" || typeof x === "function") {
//         // null 直接返回
//         if (x === null)
//             return resolve(x);
//         let then;
//         try {
//             // 把 x.then 赋值给 then
//             then = x.then;
//         }
//         catch (error) {
//             // 如果 x.then 的值抛出错误 error 则以 error 为原因拒绝 promise
//             return reject(error);
//         }
//         if (typeof then === "function") {
//             let called = false;
//             try {
//                 then.call(x, (y) => {
//                     if (called)
//                         return;
//                     called = true;
//                     resolvePromise(promise2, y, resolve, reject);
//                 }, (r) => {
//                     if (called)
//                         return;
//                     called = true;
//                     reject(r);
//                 });
//             }
//             catch (error) {
//                 if (called)
//                     return;
//                 reject(error);
//             }
//         }
//         else {
//             resolve(x);
//         }
//     }
//     else {
//         resolve(x);
//     }
// }
// queueMicrotask()
class MyPromise {
    #PENDING = 'pending';

    #FULFILLED = 'fulfilled';

    #REJECTED = 'rejected';

    constructor(executor) {
        // executor 是一个执行器，进入会立马执行
        // 传入 resolve 和 reject
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            // 如果有错误，直接执行 reject
            this.reject(error);
        }
    }

    status = this.#PENDING;

    // 成功之后的值
    value = null;

    // 存储成功回调函数
    onFulfilledCallback = [];

    // 失败之后的原因
    reason = null;

    // 存储失败回调函数
    onRejectedCallback = [];

    // 为什么使用箭头函数
    // 如果直接调用的话 普通函数的 this 指向的是 window 或者 undefined
    // 用箭头函数可以让 this 指向当前实例
    // 成功之后的状态
    resolve = (value) => {
        // 只有状态是等待，才执行修改操作
        if (this.status === this.#PENDING) {
            // 状态变为成功
            this.status = this.#FULFILLED;
            // 保存成功之后的指
            this.value = value;
            // 判断成功回调是否存在，存在就调用
            while (this.onFulfilledCallback.length) {
                this.onFulfilledCallback.shift()(value);
            }
        }
    };

    // 失败以后的状态
    reject = (reason) => {
        // 只有状态是等待，才执行修改操作
        if (this.status === this.#PENDING) {
            // 状态变为失败
            this.status = this.#REJECTED;
            // 保存失败之后的原因
            this.reason = reason;
            // 判断失败回调是否存在，存在就调用
            while (this.onRejectedCallback.length) {
                this.onRejectedCallback.shift()(reason);
            }
        }
    };

    // resolve 静态方法
    static resolve(param) {
        if (param instanceof MyPromise) {
            return param;
        }
        return new MyPromise((resolve) => {
            resolve(param);
        });
    }

    // reject 静态方法
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }

    // 1. Promise 的 then 方法是可以被多次调用的。
    // 这里如果有三个 then 的调用，如果是同步回调，那么直接返回当前的值就行；
    // 如果是异步回调，那么保存的成功失败的回调，需要用不同的值保存，因为都互不相同。
    // 2. then 的链式调用
    // then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）
    // then return 一个返回只能作为下一个 then 方法的参数，如果是 return 一个 Promise 对象，则需要判断它的状态
    // 3. then 的参数是可选de
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };
        // 需要返回一个新的 Promise 实例
        const promise2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === this.#FULFILLED) {
                // 成功回调 把成功原因返回
                // 获取成功回调函数的结果
                // 需要创建一个微任务等待 peomise2 完成初始化 否则会抛出错误 Cannot access 'promise2' before initialization
                queueMicrotask(() => {
                    // 新增错误捕获
                    try {
                        const x = onFulfilled(this.value);
                        // 传入 reslovePromise 集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if (this.status === this.#REJECTED) {
                // 失败回调 把失败原因返回
                queueMicrotask(() => {
                    try {
                        // 调用失败回调，并且把原因返回
                        const x = onRejected(this.reason);
                        // 传入 reslovePromise 集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
            if (this.status === this.#PENDING) {
                // 因为不知道后面的状态变化情况，所以将成功回调和失败回调存储起来
                // 等到执行 成功/失败 函数再传递
                this.onFulfilledCallback.push(() => {
                    queueMicrotask(() => {
                        try {
                            // 获取成功回调函数的执行结果
                            const x = onFulfilled(this.value);
                            // 传入 resolvePromise 集中处理
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
                this.onRejectedCallback.push(() => {
                    queueMicrotask(() => {
                        try {
                            // 调用失败回调，并且把原因返回
                            const x = onRejected(this.reason);
                            // 传入 resolvePromise 集中处理
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }
        });

        return promise2;
    }
}

function resolvePromise(prePromise, x, resolve, reject) {
    // 要返回新的 Promise 实例
    if (prePromise === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    // 其实就是在判断 x 是否是 promise
    // 如何判断是否是 promise 首先要是 function / object 然后要有 then 的方法 就可以认为是 promise
    if (typeof x === 'object' || typeof x === 'function') {
        // x 为 null 直接抛出
        if (x === null) {
            return resolve(x);
        }
        let then;
        try {
            then = x.then;
        } catch (error) {
            // 如果获取 x.then 的值时抛出错误，则以 error 为理由拒绝 promise
            return reject(error);
        }

        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    // this 指向 x
                    x,
                    // 如果 resolvePromsie 以值 y 为参数被调用，则执行 Resolve(promise,y)
                    (y) => {
                        // 如果 reslovePromise 和 rejecrPromise 都被调用
                        // 或者被同一参数调用多次，则优先采用首次调用被忽略剩下的调用
                        if (called) return;
                        called = true;
                        resolvePromise(prePromise, y, resolve, reject);
                    },
                    // 如果 rejectPromise 已理由 r 为参数被调用，则以理由 r 拒绝 promise
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    },
                );
            } catch (error) {
                // 如果调用 then 方法抛出了异常
                // 如果 resolvePromise / rejectPromise 已经被调用 则直接返回
                if (called) return;
                reject(error);
            }
        } else {
            // 如果 then 不是函数，则以 x 为参数执行 promise resolve(x)
            resolve(x);
        }
    } else {
        // 如果 x 不是对象或者函数，则以 x 为参数执行 promise
        resolve(x);
    }
    // // 判断 x 是不是 Promsie 的实例
    // if (x instanceof MyPromise) {
    //     // 执行 x，是将其状态变为 fulfilled / rejected
    //     // x.then(value => resolve(value), reason => reject(reason))
    //     // 简化之后
    //     x.then(resolve, reject)
    // } else {
    //     // 普通值
    //     resolve(x)
    // }
}
MyPromise.deferred = function () {
    const result = {};
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};
module.exports = MyPromise;
