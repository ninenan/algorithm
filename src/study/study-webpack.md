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
  mode: "development", // 因为只是开发环境需要 所以设置 development
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

### 热更新的原理分析

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

##### 1. file-loader

**用于处理图片文件**

```base
npm i file-loader less -D
```

webpack.config.js

```javascript
module.export = {
  module: {
    rules: [
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: "file-loader",
      },
    ],
  },
};
```

**处理字体文件**

```javascript
module.export = {
  module: {
    rules: [{ test: /.(ttf|woff|woff2|otf|eot)$/, use: "file-loader" }],
  },
};
```

##### 2. url-loader

url-loader 也可以处理图片和字体
可以设置较小资源自动 base64

```base
npm i url-loader -D
```

webpack.config.js

```javascript
module.export = {
  module: {
    rules: [
      {
        test: /.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 10240 }, // 小于 10k 的图片会自动转换成 base64 格式引入
          },
        ],
      },
    ],
  },
};
```

### 文件指纹

打包之后输出的文件名的后缀

#### 文件指纹如何生成

**Hash**: 和整个项目的构建有关，只要项目文件有修改，整个项目构建的 hash 值就会更改
**Chunkhash**: 和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值
**Contenthash**: 根据文件内容来定义 hash，文件内容不变，则 contenthash 不变（一般用于 css 文件）

webpack.prod.js

```javascript
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: {
    bundle: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"), // 指定文件路径
    filename: "[name]_[chunkhash:8].js", // 指定文件名称 js 文件使用 chunkhash
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" }, // test 指定匹配规则 use 指定使用的 loader 名称
      { test: /.js$/, use: "babel-loader" }, // 解析 js 文件，使用 babel-loader
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // loader 的解析是从右到左，从下到上的 这里先解析了 css-loader 再解析了 style-loader
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]", // 图片文件使用 hash
            },
          },
        ],
      },
      {
        test: /.(ttf|woff|woff2|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]", // 字体文件使用 hash
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css", // css 文件使用 contenthash
    }),
  ],
};
```

## 代码压缩

HTML 压缩
CSS 压缩
JS 压缩

### JS 压缩

内置了 uglifyjs-webpack-plugin

### CSS 压缩

#### 1. webpack 4

optimize-css-assets-webpack-plugin

同时使用 cssnano

```base
npm i optimize-css-assets-webpack-plugin cssnano -D
```

webpack.config.js

```javascript
module.exports = {
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
  ],
};
```

#### 2. webpack5

```base
npm i css-minimizer-webpack-plugin -D
```

webpack.config.js

```javascript
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  plugins: [new CssMinimizerPlugin()],
};
```

### HTML 文件的压缩

修改 html-webpack-plugin,设置压缩参数（很强大，常用）
webpack.config.js

```javascript
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    bundle: "./src/index.js",
    search: "./src/search.js",
  },
  output: {
    path: path.join(__dirname, "dist"), // 指定文件路径
    filename: "[name]_[chunkhash:8].js", // 指定文件名称
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["bundle"], // 这里需要是打包出来的 js 文件的 chunk 前缀
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
};
```

## 清理目录

### 通过 npm scripts 清理构建目录

#### 1. 添加命令

```json
rm -rf ./dist && webpack
rimraf ./dist && webpack
```

#### 2. 使用 clean-webpack-plugin

```base
npm i clean-webpack-plugin -D
```

webpack.config.js

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

## 补充 css 前缀

使用 postcss-loader 和 autoprefixer 插件

```base
npm i postcss-loader autoprefixer -D
```

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
        ],
      },
    ],
  },
};
```

```json
"browserslist": [
    "> 1%",
    "not ie <= 8",
    "ios 7",
    "last 2 version"
  ],
```

## css px 自动转换为 rem

使用 px2rem-loader 和 lib-flexible

```base
npm i px2rem-loader -D
npm i lib-flexible -S
```

webpack.config.js

```javascript
module.export = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75, // 对应 750 的设计稿
              remPrecision: 8, // 转换之后小数点的位数
            },
          },
        ],
      },
    ],
  },
};
```

## 资源内联

1. 代码层面

- 页面框架初始化脚本
- 上报相关打点
- css 内联避免页面闪动

2. 请求层面 - 减少 HTTP 请求

- 小图片或者字体内联 (url-loader)

### HTML 和 JS 内联

raw-loader 内联 HTML
比如说手机端每个页面都需要 meta 信息 可以动态添加

raw-loader@0.5.1 (暂时固定版本)

```base
npm i raw-loader -D
```

```html
<%=require('raw-loader!./meta.html')%>
```

raw-loader 内联 JS

```html
<script>
  <%=require("raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js")%>
</script>
```

### CSS 内联

1. 借助 style-loader

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insertAt: "top", // 样式插入到 <head>
              singleton: true, // 将所有的 style 标签合并成一个
            },
          },
        ],
        'css-loader',
        'less-loader'
      },
    ],
  },
};
```

2.  html-inline-css-webpack-plugin

## 多页面(MPA)打包通用方案

每次页面跳转的时候，后台服务器都会返回一个新的 html 文档。

**优势**

1. 每个页面都是解耦的
2. 更好的 SEO

### 基本思路

每个页面都对应一个 entry，一个 html-webpack-plugin

**缺点**
每次新增或者删除页面都需要修改 webpack 配置

webpack.config.js

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    search: "./src/search.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"),
      filename: "index.html",
      chunks: ["bundle"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/search.html"),
      filename: "search.html",
      chunks: ["search"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
};
```

### 多页面打包通用方案

动态获取 entry 和设置 html-webpack-plugin 数量
利用 **glob.sync**

```base
npm i glob -D
```

webpack.config.js

```javascript
const glob = require("glob");

// 这里打包的是 src/study-webpack 下面的文件
// 约定好的目录结构式 必须有 index.html index.js
// 动态的设置 entry 和 htmlWebpackPlugin
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(
    path.join(__dirname, "./src/study-webpack/*/index.js")
  );

  entryFiles.map((entryFile) => {
    const match = entryFile.match(/study\-webpack\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(
          __dirname,
          `src/study-webpack/${pageName}/index.html`
        ),
        filename: `${pageName}.html`,
        chunks: [`${pageName}`],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  plugins: [].concat(htmlWebpackPlugins),
};
```

## sourceMap

## 抽取页面公共资源

### 基础库的分离

将 react、react-dom 基础包通过 cdn 引入，不打包进 bundle 中

#### 使用 html-webpack-externals-plugin

webpack.config.js

```javascript
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "https://now8.gtimg.com/now/lib/16.8.6/react.min.js",
          global: "React",
        },
        {
          module: "react-dom",
          entry: "https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js",
          global: "ReactDom",
        },
      ],
    }),
  ],
};
```

index.html 文件记得需要导入 cdn 文件

#### SplitChunksPlugin

> [webpack 官网](https://webpack.docschina.org/plugins/split-chunks-plugin#root)

webpack4 内置的，替代 CommonsChunkPlugin 插件

chunks 参数说明

- async 异步引入的库进行分离（默认 比如说 Vue React 使用 import 引入 则会解析抽离出 chunk 出来）
- initial 同步引入的库进行分离
- all 所有引入的库进行分离（推荐）

webpack.config.js

```javascript
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000, // 生成 chunk 的最小体积
      minRemainingSize: 0,
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。 最小的使用次数，这里的 1 表示 如果一个公共函数使用了 1 次，就会被独立打包
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

```javascript
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        `src/study-webpack/${pageName}/index.html`
      ),
      filename: `${pageName}.html`,
      chunks: [pageName, "vendors"], // 这里需要添加 vendors
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/, // 解析 react 或者 react-dom
          name: "vendors", // 将 react 或者 react-dom 都打包到 vendors 名称的 chunk 中
          chunks: "all",
        },
      },
    },
  },
};
```

## tree shaking(摇树优化)

概念：1 个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打到 bundle 中，tree shaking 就是只把使用到的方法打入 bundle 中，没用到的方法会在 uglify 阶段被去除。

使用：webpack 默认支持，在 .babelrc 里设置 modules: false。 mode: production 的情况下默认开启
要求：必须是 ES6 语法，CJS 的方式不支持

DCE(Elimination)

什么样的代码会被去除掉

- 代码是不能有副作用的
- 代码不会被执行，不可达到
- 代码执行的结果不会被用到
- 代码只会影响死变量（只写不读）

### Tree-shaking 原理

最本质的还是对代码进行静态的分析，因此在编译阶段，代码是否被用到是要被确定下来的，而不是通过运行时候再去进行分析，哪些代码是否被用到

require 是运行时的，可以在不同的情况下动态的 require 模块

利用 ES6 模块的特点

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串变量
- import binding 是 immutable 的

代码去处：uglify 阶段删除无用代码

## ScopeHoisting 使用和原理解析

现象：构建后的代码存在大量的闭包代码

导致的问题

- 大量的闭包包裹代码，导致体积增大（模块也多越明显）
- 运行代码时创建的函数作用域变多，内存开销变大

### scope hoisting 原理

将所有的模块代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
对比：通过 scope hoisting 可以减少函数声明代码和内存开销

### scope hoisting 使用

插件是 ModuleConcatenationPlugin()

webpack.config.js

```javascript
const webpack = require("webpack");
module.exports = {
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
};
```

mode: production 默认开启
必须是 ES6 语法，CJS 不支持

## 代码分割和动态 import

### 代码分割的意义

对于大的 Web 应用来讲，将所有的代码都放在一个文件中显然不够有效，特别是当你的某些代码是在某些特殊的时候才会被使用到。webpack 有一个功能就是将代码分割成 chunks（语块），当代码运行到需要它们的时候再惊醒加载。
适用的场景

- 抽离相同代码到一个共享块
- 脚本懒加载，使得初始下载得代码更小

### 懒加载脚本的方式

- CommonJS：require.ensure()
- ES6：动态 import（需要 babel 支持）

### 如何动态 import

```base
npm i @babel/plugin-syntax-dynamic-import -D
```

```json
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

## webpack 结合 Eslint

> [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

```base
npm i babel-eslint -D
```

webpack.config.js

```javascript
const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  module: {
    rules: [{ test: /\.js$/, use: ["babel-loader"] }],
  },
  plugins: [new ESlintPlugin()],
};
```

.eslintrc.js

```javascript
module.exports = {
  parser: "babel-eslint",
  extends: "airbnb",
  env: {
    node: true,
    es6: true,
    browser: true,
  },
};
```

## webpack 打包库和组件

> [webpack 官网](https://webpack.docschina.org/configuration/output/#outputlibrarytarget)

webpack.config.js

```javascript
module.exports = {
  mode: "production",
  entry: {
    "large-number": "./src/index.js",
    "large-number.min": "./srx/index.js",
  },
  output: {
    filename: "[name].js",
    library: "largeNumber", // 指定库的全局变量
    libraryExport: "default",
    libraryTarget: "umd", // 支持库的引入方式
  },
};
```

webpack.config.js

```javascript
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    "large-number": "./src/index.js", // 开发版不压缩
    "large-number.min": "./src/index.js", // 生产版本压缩
  },
  output: {
    filename: "[name].js",
    library: "largeNumberNNN",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  // 自定义配置压缩 使用 terser-webpack-plugin 插件 压缩 .min.js 结尾的文件
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
};
```

配置入口文件

package.json

```json
{
  "main": "index.js"
}
```

index.js

```javascript
if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/large-number.min.js");
} else {
  module.exports = require("./dist/large-number.js");
}
```

发布

```base
npm publish
```

## SSR 打包

## 优化构建时命令行日志

配置 stats

> [webpack 官网](https://webpack.js.org/configuration/stats/#root)

| Preset            | Alternative | Description                                                |
| ----------------- | ----------- | ---------------------------------------------------------- |
| 'errors-only'     | none        | Only output when errors happen                             |
| 'errors-warnings' | none        | Only output errors and warnings happen                     |
| 'minimal'         | none        | Only output when errors or new compilation happen          |
| 'none'            | false       | Output nothing                                             |
| 'normal'          | true        | Standard output                                            |
| 'verbose'         | none        | Output everything                                          |
| 'detailed'        | none        | Output everything except chunkModules and chunkRootModules |
| 'summary'         | none        | Output webpack version, warnings count and errors count    |

```base
npm install @soda/friendly-errors-webpack-plugin --save-dev
```

webpack.config.js

```javascript
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");

module.exports = {
  stats: "errors-only",
  plugins: [new FriendlyErrorsWebpackPlugin()],
};
```

## 构建异常和中断处理

### 如何判断构建是否成功

在 CI\CD 的 pipeline 或者发布系统需要知道当前构建状态
可以在每次构建完成后输入 echo $? 获取错误码，不为 0 就是构建失败

### 构建异常和中断处理

webpack4 之前的版本构建失败不会抛出错误吗（error code）
Nods.js 重点饿 process.exit 规范

- 0，表示成功，回调函数中，err 为 null
- 非 0。表示执行失败，回调函数中，err 不为 null，err.code 就是传给 exit 的数字

### 如何主动捕获并处理构建错误

compiler 在每次构建结束后会触发 done 这个 hook
process.exit 主动处理构建报错

webpack.config.js

```javascript
module.exports = {
  plugins: [
    function () {
      this.hooks.done.tap("done", (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf("--watch") === -1
        ) {
          // 这里可以捕获到错误的状态和原因 做上报处理
          console.log(stats);
          console.log("build error");
          process.exit(1);
        }
      });
    },
  ],
};
```

## 配置构建包设计

### 构建配置抽离成 npm 包的意义

**通用性**

- 业务开发者无需关注构建配置
- 统一团队构建脚本

**可维护性**

- 构建配置合理的拆分
- README 文档、ChangeLog 文档...

**质量**

- 冒烟测试、单元测试、测试覆盖率
- 持续集成

### 选方案

- 通过多个配置文件管理不同的环境的构建，webpack --config 参数进行控制
- 将后见配置设计成一个库，例如：hjs-webpack、webpack-blocks
- 抽离成一个工具进行管理，比如 create-react-app、vue-cli（项目够大的话）
- 将所有的配置文件放在一个文件，通过 --env 参数控制分支选择

### 构建配置包设计

**通过多个配置文件管理不同的环境的 webpack 配置**

- 基础配置：webpack.base.js
- 开发环境：webpack.dev.js
- 生产环境：webpack.prod.js
- SSR 环境：webpack.ssr.js
- ......

**抽离成一个 npm 包统一管理**

- 规范：Git commit 日志、REMADE、ESLint 规范、Semver 规范
- 质量：冒烟测试、单元测试、测试覆盖率、CI/CD...

### 通过 webpack-merge 组合配置

```javascript
const merge = require("webpack-merge");
module.exports = merge(baseConfig, devConfig);
```

## 功能模块设计和目录结构

<img src="https://yw-dev-bucket.eos-ningbo-1.cmecloud.cn/96defbaf-a035-48c5-8268-98a6a7af49cd.png">

### 目录结构

- /test
- /lib
  - webpack.dev.js
  - webpack.prod.js
  - webpack.ssr.js
  - webpack.base.js
- README.md
- CHANGELOG.md
- .eslintrc.js
- package.json
- index.js

## 冒烟测试（smoke testing）

对提交测试的软件在进行详细深入的测试之前进行的预测试，测试的主要目的是暴露导致如案件需要重新发布的基本功能失效等严重问题

### 执行

构建是否成功
每次构建完成 build 目录是否有内容输出

- 是否有 JS、CSS 等静态资源文件
- 是否有 HTML 文件
