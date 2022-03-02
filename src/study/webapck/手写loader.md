## loader

### loader 的执行顺序

从下到上，从右到左

### loader-runner

loader-runner 允许你在不安装 webpack 的情况下运行 loaders

作用

- 作为 webpack 的依赖，webpack 中使用它执行 loader
- 进行 loader 的开发和调试

目录结构

<img src="https://tlqttest.data4truth.com//group1/M00/00/00/wKgAG2Ie3sKAavRvAAAlVMUCV2U809.png">
```base
npm i loader-runner -S
```

demo.txt

```javascript
hello world
```

raw-loader.js

```javascript
module.exports = function (source) {
  const json = JSON.stringify(source)
    .replace("hello", "my hello")
    .replace(/\u2928/g, "\\u2028")
    .replace(/u2029/g, "\\u2029");

  return `export default ${json}`;
};
```

run-loader.js

```javascript
const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
  {
    resource: path.join(__dirname, "./src/demo.txt"),
    loaders: [path.join(__dirname, "./src/raw-loader.js")],
    context: {
      minimize: true,
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    return err ? console.log(err) : console.log(result);
  }
);
```

```base
node run-loader.js
```

```base
{
  result: [ 'export default "my hello world"' ],
  resourceBuffer: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>,
  cacheable: true,
  fileDependencies: [ 'E:\\study_code\\simple-webpack\\src\\demo.txt' ],
  contextDependencies: [],
  missingDependencies: []
}
```

### loader 的参数获取

通过 loader-utils 的 getOptions 方法获取

```base
npm i loader-utils -D
```

run-loader.js

```javascript
const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
  {
    resource: path.join(__dirname, "./src/demo.txt"),
    loaders: [
      {
        loader: path.join(__dirname, "./src/raw-loader.js"),
        // 这里定义传递的参数
        options: {
          name: "test",
        },
      },
    ],
    context: {
      minimize: true,
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    return err ? console.log(err) : console.log(result);
  }
);
```

raw-loader.js

```javascript
const loaderUtils = require("loader-utils");

module.exports = function (content) {
  const { name } = loaderUtils.getOptions(this);
};
```

### loader 异常处理

#### 同步的异常处理

- loader 内直接通过 throw 抛出
- 通过 this.callback 传递错误

```javascript
this.callback(
    err: Error | null,
    content: string | Buffer,
    sourceMap?: SourceMap,
    meat?: any
)
```

raw-loader.js

```javascript
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  const json = JSON.stringify(source)
    .replace("hello", "my hello")
    .replace(/\u2928/g, "\\u2028")
    .replace(/u2029/g, "\\u2029");

  throw new Error("Error");
};
```

raw-loader.js

```javascript
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  const json = JSON.stringify(source)
    .replace("hello", "my hello")
    .replace(/\u2928/g, "\\u2028")
    .replace(/u2029/g, "\\u2029");

  this.callback(new Error("Error"), json);
};
```

#### 异步的异常处理

通过 this.async 来返回一个异步函数

- 第一个参数是 Error，第二个参数是处理的结果

```javascript
module.exports = function (input) {
  const callback = this.async(); // callback 将会返回一个异步的操作结果

  callback(null, input);
};
```

raw-loader.js

```javascript
const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  const callback = this.async();

  fs.readFile(path.join(__dirname, "./async.txt"), "utf-8", (err, data) => {
    if (err) {
      callback(err, "");
    }
    callback(null, data);
  });
};
```

### loader 中使用缓存

webpack 中默认开启 loader 缓存

- 可以使用 this.cacheable(false) 关闭缓存
  缓存条件：loader 的结果在相同的输入下有确定的输出
- 有依赖的 loader 无法使用缓存

```javascript
const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  this.cacheable(false);
  const callback = this.async();

  fs.readFile(path.join(__dirname, "./async.txt"), "utf-8", (err, data) => {
    if (err) {
      callback(err, "");
    }
    callback(null, data);
  });
};
```

### loader 如何进行文件输出

通过 this.emitFile 进行文件写入

a-loader.js

```javascript
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  const loaderUtils = require("loader-utils");

  module.exports = function (source) {
    console.log("Loader a is excuted!");

    const url = loaderUtils.interpolateName(this, "[name].[ext]", source);

    console.log(url);
    this.emitFile(url, source);
    return source;
  };
};
```

src/index.js

```javascript
const a = 1;
```

webpack.config.js

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve("./loaders/a-loader"),
          //   path.resolve("./loaders/b-loader"),
        ],
      },
    ],
  },
};
```

```base
npm run build
```

会将 src/index 中的内容写入到 dist/index.js 中
