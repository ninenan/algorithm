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
