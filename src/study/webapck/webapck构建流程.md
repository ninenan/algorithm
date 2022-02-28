## webpack 流程

### 准备阶段

webpack 的编译都按照下面的钩子调用顺序执行（简化版本）

1. entry-option（初始化 option）
2. run（开始编译）
3. make（从 entry 开始递归分析依赖，对每个依赖进行 build）
4. before-resolve（对模块位置进行解析）
5. build-module（开始构建某个模块）
6. normal-module-loader（将 loader 加载完成的 module 进行编译，生成 AST 树）
7. program（遍历 AST，当遇到 require 等一些调用表达式时，收集依赖）
8. seal（所有依赖 build 完成，开始优化）
9. emit（输出到 dist 目录）
