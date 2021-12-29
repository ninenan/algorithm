// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
// 代码参考 https://juejin.cn/post/6945319439772434469#heading-27
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
function isFun(params) {
    return typeof params === "function";
}
class MyPromise {
    constructor(executor) {
        // 储存状态的变量，初始值是 pending
        this.status = PENDING;
        // resolve 和 reject 使用箭头函数的话可以让 this 指向当前实例
        // 如果是普通函数的话 直接调用 this 指向 window 或 undefined
        // 成功之后的返回值
        this.value = null;
        // 存储成功的回调函数
        this.onFulfilledCallbacks = [];
        // 失败之后的返回值
        this.reason = null;
        // 存储失败的回调函数
        this.onRejectedCallbacks = [];
        // 更改成功之后的状态
        this.resolve = (value) => {
            // 只有状态是 pending，才执行状态修改
            if (this.status === PENDING) {
                // 状态修改为成功
                this.status = FULFILLED;
                // 保存成之后的值
                this.value = value;
                // 判断成功回调是否存在，存在就调用
                while (this.onFulfilledCallbacks.length) {
                    this.onFulfilledCallbacks.shift()(value);
                }
            }
        };
        // 更改失败之后的状态
        this.reject = (reason) => {
            if (this.status === PENDING) {
                // 状态变为失败
                this.status = REJECTED;
                // 保存失败的原因
                this.reason = reason;
                // 判断失败回调是否存在，如果存在就调用
                while (this.onRejectedCallbacks.length) {
                    this.onRejectedCallbacks.shift()(reason);
                }
            }
        };
        // executor 是一个执行器，进入会立即执行
        // 捕获执行器中的代码，如果执行器中有代码错误，Promise 的状态要变成失败
        try {
            executor(this.resolve, this.reject);
        }
        catch (err) {
            // 如果有错误，直接执行 reject
            this.reject(err);
        }
    }
    // then 方法要链式调用那么就需要返回一个 Promise 对象
    // then 方法里面 return 一个返回值作为下一个 then 方法的参数，
    // 如果是 return 一个 Promise 对象，那么就需要判断它的状态
    then(onFulfilled, onRejected) {
        // 如果不穿参数，就使用默认值
        const onRealFulfilled = isFun(onFulfilled)
            ? onFulfilled
            : (value) => value;
        const onRealRejected = isFun(onRejected)
            ? onRejected
            : (reason) => {
                throw reason;
            };
        // 为了链式调用 直接返回一个 promise，并 return 出去
        const promise2 = new MyPromise((resolve, reject) => {
            // 成功执行函数
            const fulfilledMicrotask = () => {
                // 创建一个微任务等待 promise2 完成初始化
                queueMicrotask(() => {
                    try {
                        // 获取成功回调函数的执行结果
                        const x = onRealFulfilled(this.value);
                        // 传入 resolvePromise 集中处理
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (error) {
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
                    }
                    catch (error) {
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
    static resolve(parameter) {
        if (parameter instanceof MyPromise) {
            return parameter;
        }
        // 转换成常规的写法
        return new MyPromise((resolve) => {
            resolve(parameter);
        });
    }
    // reject 静态方法
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    // 如果相等，说明 return 的是自己，抛出类型错误并返回
    if (promise2 === x) {
        return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
    }
    if (typeof x === "object" || typeof x === "function") {
        // null 直接返回
        if (x === null)
            return resolve(x);
        let then;
        try {
            // 把 x.then 赋值给 then
            then = x.then;
        }
        catch (error) {
            // 如果 x.then 的值抛出错误 error 则以 error 为原因拒绝 promise
            return reject(error);
        }
        if (typeof then === "function") {
            let called = false;
            try {
                then.call(x, (y) => {
                    if (called)
                        return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called)
                        return;
                    called = true;
                    reject(r);
                });
            }
            catch (error) {
                if (called)
                    return;
                reject(error);
            }
        }
        else {
            resolve(x);
        }
    }
    else {
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