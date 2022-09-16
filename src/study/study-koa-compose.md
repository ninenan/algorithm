# koa-compose

## 洋葱镇楼

<img src="https://intranetproxy.alipay.com/skylark/lark/0/2022/png/58556699/1663231726114-d8a8e02d-b5ee-47ae-81ed-b371d659588d.png" />

## koa-compoase 经典执行顺序图

> [图片来源](https://github.com/koajs/koa/blob/master/docs/guide.md#writing-middleware)

<img src="https://github.com/lxchuan12/koa-compose-analysis/raw/main/images/middleware.gif" />

## 1. 环境准备

源码地址

https://github.com/koajs/compose

执行命令

```cmd
git clone https://github.com/koajs/compose.git
cd componse
yarn
yarn test // 执行测试用例
```

## 2. TDD（根据测试用例来学习代码）
[什么是 TDD](https://zhuanlan.zhihu.com/p/91755900)

测试驱动开发

根据代码中已经写好的测试用例（对应目录 `compose/test/`），可以通过运行测试用例的方式来学习代码。

### 2.1 Koa Compose
```javascript
describe('Koa Compose', function () {
  it('should work', async () => {
    const arr = []
    const stack = []

    stack.push(async (context, next) => {
      arr.push(1)
      await wait(1)
      await next()
      await wait(1)
      arr.push(6)
    })

    stack.push(async (context, next) => {
      arr.push(2)
      await wait(1)
      await next()
      await wait(1)
      arr.push(5)
    })

    stack.push(async (context, next) => {
      arr.push(3)
      await wait(1)
      await next()
      await wait(1)
      arr.push(4)
    })

    await compose(stack)({})
    expect(arr).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]))
  })

```
上面的函数最后断言 `arr` 数组的返回值是 `[1, 2, 3, 4, 5, 6]`

### 2.2 compose 函数

`compose` 函数主要做了两件事
1. 判断传入的参数是否数组并且数组的每一项是否是函数
2. 返回一个带有 context 和 next 参数的函数，函数最终会返回一个 promise

```javascript
'use strict'

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
`compose` 函数最主要的 `dispatch` 函数

```javascript
return function (context, next) {
  // last called middleware #
  let index = -1
  return dispatch(0)
    // next() 不能调用多次
    if (i <= index) return Promise.reject(new Error('next() called multiple times'))
    index = i
    // 取出当前的执行函数
    let fn = middleware[i]
    // 如果是最后一个函数的话，next 就为 undefined
    if (i === middleware.length) fn = next
    // 当是最后一个函数的时候，直接返回 Promise.resolve()
    if (!fn) return Promise.resolve()
    try {
      // 递归过程
      // 将 context 一路传递下去
      // i + 1 使得 let fn = middleware[i] 将是下一个中间件的函数，从而使得 next 函数的返回值将是下一个 fn 的返回值
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
```
#### 简要流程

结合上面的测试用例可以知道，compose 返回的是一个 promise

1. 从中间件中获取第一个函数，传入 context 和 next 函数，
2. 第一个 next 函数返回的也是一个 promise，从中间件获取第二个函数，传入 context 和 next 函数
3. 第二个 next 函数返回一个 promise，从中间件获取第三个函数，传入 context 和 next 函数
4. 后面的以此类推...

### 2.3 should be able to be called twice

```javascript
it('should be able to be called twice', () => {
  const stack = []

  stack.push(async (context, next) => {
    context.arr.push(1)
    await wait(1)
    await next()
    await wait(1)
    context.arr.push(6)
  })

  stack.push(async (context, next) => {
    context.arr.push(2)
    await wait(1)
    await next()
    await wait(1)
    context.arr.push(5)
  })

  stack.push(async (context, next) => {
    context.arr.push(3)
    await wait(1)
    await next()
    await wait(1)
    context.arr.push(4)
  })

  const fn = compose(stack)
  const ctx1 = { arr: [] }
  const ctx2 = { arr: [] }
  const out = [1, 2, 3, 4, 5, 6]

  return fn(ctx1).then(() => {
    // 这里的 assert 是 node 自带的
    // 断言 out 和 ctx1.arr 是一致的
    assert.deepEqual(out, ctx1.arr)
    return fn(ctx2)
  }).then(() => {
    assert.deepEqual(out, ctx2.arr)
  })
})
```
这个用例可以看出 context 是可以一直传下来的

### 2.4 should only accept an array

```javascript
it('should only accept an array', () => {
  expect(() => compose()).toThrow(TypeError)
})
```
`compose` 入参必须是一个数组

### 2.5 should create next functions that return a promise

```javascript
function isPromise(x) {
  return x && typeof x.then === 'function'
}

it('should create next functions that return a Promise', function () {
  const stack = []
  const arr = []
  for (let i = 0; i < 5; i++) {
    stack.push((context, next) => {
      arr.push(next())
    })
  }

  compose(stack)({})

  for (const next of arr) {
    assert(isPromise(next), 'one of the functions next is not a Promise')
  }
})
```
`next` 返回的是一个新的 `promise` 函数

### 2.6 should work with 0 middleware

```javascript
it('should work with 0 middleware', function () {
  return compose([])({})
})
```

`compose` 函数可以传入空数组，当传入空数组的时候，将会默认返回一个 `promise`

### 2.7 should only accept middleware as functions

```javascript
it('should only accept middleware as functions', () => {
  expect(() => compose([{}])).toThrow(TypeError)
})
```
`compose` 函数的入参数组中必须每一项都是函数

### 2.8 should work when yielding at the end of the stack

```javascript
it('should work when yielding at the end of the stack', async () => {
  const stack = []
  let called = false

  stack.push(async (ctx, next) => {
    await next()
    called = true
  })

  await compose(stack)({})
  assert(called)
})
```

### 2.9 should reject on errors in middleware

```javascript
it('should reject on errors in middleware', () => {
  const stack = []

  stack.push(() => { throw new Error() })

  return compose(stack)({})
    .then(() => {
      throw new Error('promise was not rejected')
    }, (e) => {
      expect(e).toBeInstanceOf(Error)
    })
})
```

`compose` 函数的错误处理能力，对应了代码中的 `try...catch`

```javascript
try {
  return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
} catch (err) {
  return Promise.reject(err)
}
```

### 2.10 should keep the context

```javascript
it('should keep the context', () => {
  const ctx = {}

  const stack = []

  stack.push(async (ctx2, next) => {
    await next()
    expect(ctx2).toEqual(ctx)
  })

  stack.push(async (ctx2, next) => {
    await next()
    expect(ctx2).toEqual(ctx)
  })

  stack.push(async (ctx2, next) => {
    await next()
    expect(ctx2).toEqual(ctx)
  })

  return compose(stack)(ctx)
})
```

`compose` 函数可以保证 context 的一直引用

### 2.11 should catch downstream errors
```javascript
it('should catch downstream errors', async () => {
  const arr = []
  const stack = []

  stack.push(async (ctx, next) => {
    arr.push(1)
    try {
      arr.push(6)
      await next()
      arr.push(7)
    } catch (err) {
      arr.push(2)
    }
    arr.push(3)
  })

  stack.push(async (ctx, next) => {
    arr.push(4)
    throw new Error()
  })

  await compose(stack)({})
  expect(arr).toEqual([1, 6, 4, 2, 3])
})
```

`compose` 函数可以捕获到下游的错误，当 `throw new Error()` 的时候，会抛出异常，从而执行 `catch` 中的代码

### 2.12 should compose w/ next

```javascript
it('should compose w/ next', () => {
  let called = false

  return compose([])({}, async () => {
    called = true
  }).then(function () {
    console.log('called :>> ', called);
    assert(called)
  })
})
```

`compose` 函数会返回一个函数，函数会执行 `next` 并且返回一个 `promise`

### 2.13 should handle errors in wrapped non-async functions

```javascript
it('should handle errors in wrapped non-async functions', () => {
  const stack = []

  stack.push(function () {
    throw new Error()
  })

  return compose(stack)({}).then(() => {
    throw new Error('promise was not rejected')
  }, (e) => {
    expect(e).toBeInstanceOf(Error)
  })
})
```

`compose` 函数可以处理非异步的函数，其实也是 `try...catch...` 实现的

### 2.14 should compose w/ other compositions

```javascript
it('should compose w/ other compositions', () => {
  const called = []
j
  return compose([
    compose([
      (ctx, next) => {
        called.push(1)
        return next()
      },
      (ctx, next) => {
        called.push(2)
        return next()
      }
    ]),
    (ctx, next) => {
      called.push(3)
      return next()
    }
  ])({}).then(() => {
    console.log(called);
    assert.deepEqual(called, [1, 2, 3])
  }
  )
})
```

### 2.15 should throw if next() is called multiple times

```javascript
it('should throw if next() is called multiple times', () => {
  return compose([
    async (ctx, next) => {
      await next()
      await next()
    }
  ])({}).then(() => {
    throw new Error('boom')
  }, (err) => {
    assert(/multiple times/.test(err.message))
  })
})
```
`next` 不能调用两次，这里对应的代码是

```javascript
if (i <= index) return Promise.reject(new Error('next() called multiple times'))
```

### 2.16 should return a valid middleware

```javascript
it('should return a valid middleware', () => {
  let val = 0
  return compose([
    compose([
      (ctx, next) => {
        val++
        return next()
      },
      (ctx, next) => {
        val++
        return next()
      }
    ]),
    (ctx, next) => {
      val++
      return next()
    }
  ])({}).then(function () {
    expect(val).toEqual(3)
  })
})
```
`compose` 函数返回一个有效的中间件

### 2.17 should return last return value

```javascript
it('should return last return value', () => {
  const stack = []

  // 1
  stack.push(async (context, next) => {
    const val = await next()
    expect(val).toEqual(2)
    return 1
  })

  // 2
  stack.push(async (context, next) => {
    const val = await next()
    expect(val).toEqual(0)
    return 2
  })

  const next = () => 0
  return compose(stack)({}, next).then(function (val) {
    expect(val).toEqual(1)
  })
})
```

`compose` 函数从里往外执行，先执行 2，返回值为 2，再执行 1，返回 1

### 2.18 should not affect the original middleware array

```javascript
it('should not affect the original middleware array', () => {
  const middleware = []
  const fn1 = (ctx, next) => {
    return next()
  }
  middleware.push(fn1)

  for (const fn of middleware) {
    assert.equal(fn, fn1)
  }

  compose(middleware)

  for (const fn of middleware) {
    assert.equal(fn, fn1)
  }
})
```

### 2.19 should not get stuck on the passed in next
```javascript
it('should not get stuck on the passed in next', () => {
  const middleware = [(ctx, next) => {
    // middleware 自增
    ctx.middleware++
    return next()
  }]
  const ctx = {
    middleware: 0,
    next: 0
  }

  return compose(middleware)(ctx, (ctx, next) => {
    // next 自增
    ctx.next++
    // 这里将返回一个 promise
    return next()
  }).then(() => {
    expect(ctx).toEqual({ middleware: 1, next: 1 })
  })
})
```

## 3. 总结

1. `koa-compose` 通过递归调用的方式，结合 `Promise.resolve` 来使用下一个中间件的函数（感觉就像是套娃）
2. `TDD` 和 [责任链模式](https://refactoringguru.cn/design-patterns/chain-of-responsibility)
3. 完全没想到一个函数会有这么多的测试用例，但是通过测试用例来学习代码的话，会理解的更加到位（果然 `TDD` 真香）

