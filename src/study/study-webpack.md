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
