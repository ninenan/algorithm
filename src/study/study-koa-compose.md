洋葱镇楼

<img src="https://intranetproxy.alipay.com/skylark/lark/0/2022/png/58556699/1663231726114-d8a8e02d-b5ee-47ae-81ed-b371d659588d.png" />
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

## 2. TDD
tdd：测试驱动开发
代码中已经写好了对应的测试用例（对应目录 `compose/test/`），这里我们可以通过运行测试用例的方式来学习代码。

### 第一个用例
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
### compose 函数
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
      // 将 context 一路传递下去
      // i + 1 使得 let fn = middleware[i] 将是下一个中间件的函数，从而使得 next 函数的返回值将是下一个 fn 的返回值
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
```


