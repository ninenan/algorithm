# module

将代码拆分成独立的块，然后再把这些块连接起来可以通过模块模式来实现。

在 web 开发早期，为了团队协作和代码维护，开发者会将 JavaScript 代码拆分写在不同的文件下，然后通过
script 标签来引入。

```javascript
<script src="./moduleA"></script>
<script src="./moduleB"></script>
```

虽然每个代码处于不同的文件中，但最终所有的 js 变量还是会处于同一个**全局作用域**下，这个时候就需要注意由于作用域**变量替身**带来的问题。

```javascript
<script>
    var num = 1
    setTimeout(() => {
        console.log(num)
    }, 1000)
</script>
<script>
    var num = 2
</script>
```

上面代码，分别加载了两个 script 标签，两段 js 都声明了 num 变量。第一段脚本意是在 1s 之后打印自己声明的 num 变量 1，但最终打印了第二段脚本中的 num，结果是 2 。产生这个问题的原因是因为运行时声明变量都在全局下，最终产生了冲突。
同时，如果代码之间有依赖关系的话，需要额外关注脚本的加载顺序，如果文件依赖顺序发生了改东，就需要在 html 手动变更加载标签的顺序，非常麻烦。

因此为了解决上述的问题,就需要将脚本**模块化**

1. 每个模块都有自己的**变量作用域**，两个模块之间的内部变量不会产生冲突。
2. 不同的模块之间保留相互**导入导出**方式方法，模块间可以相互通信。模块的加载和执行遵循一定的规范，能保证彼此之间的依赖关系。

## CommonJS

CommonJS 规范概述了同步声明依赖的模块定义。这个规范主要用于在服务器端实现模块化代码组织，但也可用于定义在浏览器中使用的模块依赖。CommonJS 模块语法不能在浏览器中直接运行。
在 CommonJs 中，每个 js 文件就是一个**模块**。
CommonJS 模块定义需要使用 require()指定依赖，而使用 exports 对象定义自己的公共 API。

```javascript
// index.js
const moduleA = require("./moduleA.js"); // 获取相邻文件 moduleA 的文件导出的结果
console.log(moduleA);
```

```javascript
// moduleA.js
module.exports = "hello world"; // 导出当前模块内部的值
```

```javascript
// index.js
require("./moduleA.js");
const m = require("./moduleB.js");

console.log(m);
```

```javascript
// moduleA
const m = require("./moduleB.js");
setTimeout(() => {
  console.log(m);
}, 1000);
```

```javascript
// moduleB
const m = new Date().getTime();
module.exports = m;
```

- index.js 模块通过执行 require 函数，分别加载了相对路径为 ./moduleA 和 ./moduleB 的两个模块，同时输出 moduleB 模块的结果。
- moduleA.js 模块通过 require 函数加载了 moduleB 模块，在 1s 之后输出了加载进来的结果
- moduleB 模块就是定义了一个时间戳，并通过 module.exports 导出。

<img src="https://eos-wuxi-1.cmecloud.cn/crmoss/d0ddc157-7087-455f-a6c1-a0015a5d8d1e.png">

执行 node.js，可以发现两者的结果是一致的。

1. 模块之间内部即使有相同的变量名，但是运行时并没有冲突。**说明它有处理模块变量作用域的能力**
2. moduleB 通过 module.exports 导出了一个变量，变量可以在 moduleA 和 index 模块中被加载。**说明有导入导出的方式，同是能够处理基本的依赖关系**。
3. 同时在 index 模块和 moduleA 模块加载了 moduleB，但得到的结果相同，**说明保证了模块单例**。

在 CommonJS 中，**模块加载是模块系统执行的同步操作**。因此 require()可以像下面这样以编程
方式嵌入在模块中：

```javascript
console.log("moduleA");
if (loadCondition) {
  require("./moduleA");
}
```

这里，moduleA 只会在 loadCondition 求值为 true 时才会加载。这个加载是同步的，因此 if()
块之前的任何代码都会在加载 moduleA 之前执行，而 if()块之后的任何代码都会在加载 moduleA 之
后执行。同样，加载顺序规则也会适用。因此，如果 moduleA 已经在前面某个地方加载过了，这个条
件 require()就意味着只暴露 moduleA 这个命名空间而已。

### AMD

异步模块定义 Asynchronous Module Definition

AMD 的一般策略是让模块声明自己的依赖，而运行在浏览器中的模块系统会按需获取依赖，并在依赖加载完成后立即执行依赖它们的模块。

AMD 模块实现的核心是用函数包装模块定义。这样可以防止声明全局变量，并允许加载器库控制何时加载模块。
包装函数也便于模块代码的移植，因为包装函数内部的所有模块代码使用的都是原生 JavaScript 结构。
包装模块的函数是全局 define 的参数，它是由 AMD 加载器库的实现定义的。

注意：如果想使用 AMD 规范，就需要添加一个符合 AMD 规范的加载器脚本在页面中，例如 require.js

```javascript
// index.js
require(["moduleA", "moduleB"], function (moduleA, moduleB) {
  console.log(moduleB);
});
```

```javascript
// moduleA.js
define(function (require) {
  let m = require("moduleB");
  setTimeout(() => {
    console.log(m);
  }, 1000);
});
```

```javascript
// moduleB.js
define(function (require) {
  let m = new Date().getTime();
  return m;
});
```
