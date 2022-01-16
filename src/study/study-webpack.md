# webpack

## 为什么需要构建工具

1. 转换 ES6 语法
2. 转换 JSX
3. CSS 前缀补全/预处理器
4. 压缩混淆
5. 图片压缩
   ......

## webpack 配置组成

零配置下只存在 entry 和 output

```javascript
module.exports = {
  entry: "./src/index.js", // 打包入口文件 零配置下默认 entry 是 ./src/index.js
  output: "./dist/main.js", // 打包的输出 零配置下默认 output 是 ./dist/main.js
  mode: "production", // 环境
  module: {
    rules: [
      { test: /.txt$/, use: "raw-loader" }, // Loader 配置
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index/html",
    }), // 插件配置
  ],
};
```

**查看是否安装成功**

```base
./node_modules/.bin/webpack -v
```

### Entry

用来指定 webpack 的打包入口

#### 单入口

entry 是一个字符串

```javascript
module.exports = {
  entry: "./path/to/my/entry/file.js",
};
```

#### 多入口

entry 是一个对象

```javascript
module.exports = {
  entry: {
    app: "./src/app.js",
    adminApp: "./src/adminAp.js",
  },
};
```

### Output

Output 用来告诉 webpack 如何将编译后的文件输出到磁盘

#### 单入口

```javascript
module.exports = {
  entry: './path/to/my/path.js'
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  }
}
```

#### 多文件

```javascript
module.exports = {
  entry: {
    app: "./src/app.js",
    adminApp: "./src/adminApp.js",
  },
  output: {
    filename: "[name].js", // 通过占位符方法 指定打包文件的名称 dist 文件夹下面 会出现两个 js 文件 分别是 app.js 和 adminApp.js
    path: __dirname + "/dist",
  },
};
```

### Loaders

webpack 开箱即用只支持 js 和 json 两种文件类型，通过 loaders 去支持其他文件类型并且将他们转换成有效的模块，并且可以添加到依赖图中。

本事是一个函数，接受源文件作为参数，返回转换的结果。

Loader 的解析是从右到左，从下到上

#### 常用的 loaders

| 名称          | 描述                         |
| ------------- | ---------------------------- |
| babel-loader  | 转换 ES6、ES7 等新语法       |
| css-loader    | 支持 .css 文件的加载和我解析 |
| less-loader   | 支持 .less 文件的加载和解析  |
| ts-loader     | 将 TS 转换成 JS              |
| file-loader   | 进行图片、字体等的打包       |
| raw-loader    | 将文件以字符串的形式导入     |
| thread-loader | 多进程打包 JS 和 CSS         |

```javascript
const path = require("path");

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" }, // test 指定匹配规则 use 指定使用的 loader 名称
    ],
  },
};
```

### Plugins

用于 bundle 文件的优化，资源管理和环境变量注入。（简单理解就是任何 loaders 处理不了的事 都可以通过 plugins 来处理）

**作用于整个构建过程**

#### 常见的 Plugins

| 名称                     | 描述                                             |
| ------------------------ | ------------------------------------------------ |
| COmmonsChunkPlugin       | 将 chunks 相同的模块代码提取成公共 js            |
| CleanWebpackPlugin       | 清理构建目录                                     |
| ExtractTextWebpackPlugin | 将 CSS 从 bundle 文件里提取成一个独立的 css 文件 |
| CopyWebpackPlugin        | 将文件或者文件夹拷贝到构建的输出目录             |
| HtmlWebpackPlugin        | 创建 HTML 文件去承载输出的 bundle                |
| UglifyWebpackPlugin      | 压缩 JS                                          |
| ZipWebpackPlugin         | 将打包出的资源生成一个 zip 包                    |

```javascript
const path = require("path");

module.exports = {
  output: {
    filename: 'bundle.js'
  }
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }) // 放到 plugins 数组里
  ],
};
```

### Mode

Mode 用来指定当前的构建环境是：production、development 还是 none
设置 mode 可以使用 webpack 内置的函数，默认值是 production

#### Mode 的内置函数功能

| 选项        | 描述                                                                                                                                                                                                                          |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。                                                                                                                               |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。 |
| none        | 不开启任何优化选项                                                                                                                                                                                                            |

```javascript
const path = require("path");

module.exports = {
  mode: "production",
};
```

### webpack 中的文件监听

文件监听是在发生源码变化时，自动重新构建出新的文件输出文件

**需要每次都要刷新页面才能看到效果**

#### webpack 开启监听模式，有两种方式

1. 启动 webpack 命令时，带上 --watch 参数
2. 在配置 webpack.config.js 中设置 watch:true

#### 文件监听的原理分析

轮询判断文件的最后编辑时间是否发生变化
某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout

```javascript
module.export = {
  // 默认 false 不开启
  watch: true,
  // 之后开启监听模式，watchOptions 才有意义
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则匹配
    // 直接直接忽略掉 node_modules 文件夹下的内容对性能有好处
    ignored: /node_modules/,
    // 监听到变化发生后会等到 300ms 再去执行，默认 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的循环系统指定的文件有没有发生变化，默认是每秒 1000 次
    poll: 1000,
  },
};
```

### webpack 热更新 webpack-dev-server

WDS 不刷新浏览器
WDS 不输出文件，而是放在内存中（因为是放在内存当中，所以构建速度会有更大的提升）
使用 HotModuleReplacementPlugin 插件

```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    bundle: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"), // 指定文件路径
    filename: "[name].js", // 指定文件名称
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" }, // test 指定匹配规则 use 指定使用的 loader 名称
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()], // 使用 HotModuleReplacementPlugin plugin
  devServer: {
    // 该配置项允许配置从目录提供静态文件的选项（默认是 'public' 文件夹）。将其设置为 false 以禁用：
    static: {
      directory: path.join(__dirname, "./dist"),
    },
    // 设置热更新 因为使用上面的 plugin 这里可写可不写 默认为 true
    hot: true,
  },
};
```

```json
"scripts": {
  "dev": "webpack-dev-server --open" // 添加新的启动命令 npm run dev 启动
}
```

### webpack 热更新 webpack-dev-middleware

WDM 将 webpack 输出的文件传输给服务器
适用于灵活的定制场景

### 人更新的原理分析

webpack Compiler : 将 js 编译成 Bundle
HMR Server: 将热更新的文件输出给 HMR Runtime
Bundle server: 提供文件在浏览器的访问
HMR Runtime: 会被注入到浏览器，更新文件的变化
bundle.js: 构建输出的文件

1. 启动阶段
   文件系统里面将初始的代码通过 webpack Compiler 进行打包成 Bundle，然后将打包好的文件传输给 Bundle Server，Bundle Server 是一个服务器，Bundle Server 可以让文件以一个 server 的方式让浏览器访问
2. 文件更新
   代码通过 webpack Compiler 进行编译，将代码发送给 HRM Server，HMR Server 可以知道哪些文件发生了改变,
   HMR Server 通知 HMR Runtime （一般以一种 json 的数据进行传输），HMR Runtime 再改变相应的代码，并且不会刷新浏览器

<img srv="https://yw-dev-bucket.eos-ningbo-1.cmecloud.cn/d427ba53-ca7c-4117-8d4f-730cd983bec3.png">

### 资源解析

#### 解析 ES6

使用 babel-loader
创建 babel 的配置文件：.babelrc

```base
npm i @babel/core @babel/preset-env babel-loader -D
```

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      { test: /.js$/, use: "babel-loader" }, // 解析 js 文件，使用 babel-loader
    ],
  },
};
```

.babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

#### 解析 CSS

需要安装 css-loader

css-loader 用于加载 .css 文件，并将其转换成 commonjs 对象
style-loader 用于将样式通过 <style\> 标签插入到 head 中

```base
npm i style-loader css-loader -D
```

webpack.config.js

```javascript
module.export = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

#### 解析 Less

less-loader 用于将 less 转换成 css

```base
npm i less-loader less -D
```

webpack.config.js

```javascript
module.export = {
  module: {
    rules: [
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
```

#### 解析图片/字体

file-loader 用于处理文件

```base
npm i file-loader less -D
```

webpack.config.js

```javascript
module.export = {
  module: {
    rules: {
      test: /.(png|jpg|jpeg|gif)$/,
      use: "file-loader",
    },
  },
};
```
