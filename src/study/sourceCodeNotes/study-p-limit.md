# p-limit

[源码地址](https://github.com/sindresorhus/p-limit)

[yocto-queue](https://github.com/sindresorhus/yocto-queue)

## 为什么使用

如果一次性请求多个请求的话，会对服务器产生压力，可以使用 `p-limit` 限制并发的请求数量。

## 使用方式

```javascript
import pLimit from 'p-limit';

// 1 是最大并发数
const limit = pLimit(1);

const input = [
  limit(() => fetchSomething('foo')),
  limit(() => fetchSomething('bar')),
  limit(() => doSomething())
];

// Only one promise is run at once
const result = await Promise.all(input);
console.log(result);
```

当前正在运行的并发数
```javascript
limit.activeCount
```

正在等待的请求数
```javascript
limit.pendingCount
```

清除当前的请求队列
```javascript
limit.clearQueue()
```

### 源码解析

```javascript
// Queue 是一个队列（先进先出）
import Queue from 'yocto-queue';

export default function pLimit(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError('Expected `concurrency` to be a number from 1 and up');
  }

  // 创建一个队列
  const queue = new Queue();
  // 当前正在运行的并发数
  let activeCount = 0;

  // 执行队列中的下一个函数
  const next = () => {
    activeCount--;

    if (queue.size > 0) {
      // 执行队列中最后的一个函数
      queue.dequeue()();
    }
  };

  // 执行函数
  const run = async (fn, resolve, args) => {
    // 当前正在运行的并发数+1
    activeCount++;

    // 获取到对应的结果
    const result = (async () => fn(...args))();

    // 这里的 resolve 是 generator 中的 resolve
    resolve(result);

    // result 会有是 promise 的情况
    try {
      await result;
    } catch {}

    // 执行队列中下一个函数
    next();
  };

  // 核心
  // 加入队列函数
  const enqueue = (fn, resolve, args) => {
    // 加入队列的函数每个都是 run 方法
    queue.enqueue(run.bind(undefined, fn, resolve, args));

    // IIFE 自执行函数
    (async () => {
      // This function needs to wait until the next microtask before comparing
      // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
      // when the run function is dequeued and called. The comparison in the if-statement
      // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.

      // 这个函数需要等到下一个微任务完成后才能进行触发
      //  activeCount 到 concurrency，因为 activeCount 是异步更新的
      // 当 run 函数出队并被调用时，在 if 函数中做比较
      // 也需要异步发生，以获得 activeCount 的最新值。

      // 初始的时候返回一个 Promise
      await Promise.resolve();

      // 当前运行的并发数量小于定义的最高的并发数 并且 队列中还存在需要执行的函数
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };

  // generator 函数返回一个 promise，并且执行 enqueue 函数
  const generator = (fn, ...args) => new Promise(resolve => {
    enqueue(fn, resolve, args);
  });

  // 定义 generator 函数的其他属性
  // pLimit 函数最后返回一个 generator 函数
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.size,
    },
    clearQueue: {
      value: () => {
        queue.clear();
      },
    },
  });

  return generator;
}
```

### 执行顺序图

<img style="width: 100%;" src="https://intranetproxy.alipay.com/skylark/lark/0/2022/png/58556699/1663926651491-28972073-91c9-4523-a50c-27a543283c3e.png?x-oss-process=image%2Fresize%2Cw_1434%2Climit_0">
