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
    executor(this.resolve, this.reject);
  }
  // 储存状态的变量，初始值是 pending
  status: Status = PENDING;
  // resolve 和 reject 使用箭头函数的话可以让 this 指向当前实例
  // 如果是普通函数的话 直接调用 this 指向 window 或 undefined

  // 成功之后的返回值
  value = null;
  // 存储成功的回调函数
  onFulfilledCallback: Function | null = null;

  // 失败之后的返回值
  reason: unknown | null = null;
  // 存储失败的回调函数
  onRejectedCallback: Function | null = null;

  // 更改成功之后的状态
  resolve: Resolve = (value: any) => {
    // 只有状态是 pending，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成之后的值
      this.value = value;
      // 判断成毁掉是否存在，存在就调用
      this.onFulfilledCallback && this.onFulfilledCallback(value);
    }
  };

  // 更改失败之后的状态
  reject: Reject = (reason: unknown) => {
    if (this.status === PENDING) {
      // 状态变为失败
      this.status = REJECTED;
      // 保存失败的原因
      this.reason = reason;
      // 盘端失败回调是否存在，如果存在就调用
      this.onRejectedCallback && this.onRejectedCallback(reason);
    }
  };

  then(onFulfilled: Function, onRejected: Function) {
    // 判断状态
    if (this.status === FULFILLED) {
      // 调用成功回调，返回值
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      // 调用失败回调，返回值
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      // 因为不清楚后面的状态，因此先将成功和失败的回调函数全部存储起来
      // 等到执行的成功失败额函数时候再传递
      this.onFulfilledCallback = onFulfilled;
      this.onRejectedCallback = onRejected;
    }
  }
}

export default MyPromise;
