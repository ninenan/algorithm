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

#### webpackOptionsApply

将所有的配置 options 参数转换成 webpack 内部插件

使用默认插件列表

例子

- output.library -> LIbraryTemplatePlugin
- externals -> ExternalsPlugin
- devtool -> EvalDevtoolModulePlugin, SourceMapDevToolPlugin
- AMDPlugin, CommonJSPlugin
- RemoveEmptyChunksPlugin

### 模块构建和 chunk 生成阶段

#### Compiler

Compiler 模块是 webpack 的主要引擎，它通过 CLI 或者 Node API 传递的所有选项创建出一个 compilation 实例。 它扩展（extends）自 Tapable 类，用来注册和调用插件。 大多数面向用户的插件会首先在 Compiler 上注册。

Compiler 控制整个 webpack 的生命周期，它不执行具体的任务，只是进行一些调度工作（调兵遣将）。它创建了 Compilation 对象，Compilation 任务执行完毕后会将最终的处理结果返回给 Compiler

#### Compilation

> [掘金-饿了么新餐饮前端团队](https://juejin.cn/post/6844904006003736583)

Compilation 是编译阶段的主要执行者，（是 Tapable 的实例），执行模块创建、依赖收集、分块、打包等主要任务的对象。

1. addEntry()：
   根据入口的配置模式，分为单入口和多入口。该方法里边主要调用了\_addModuleChain()。
2. \_addModuleChain()：
   创建 module。根据入口的不同，使用不同的模块工厂（从创建 Compilation 传入的参数中获取，包括 ContextModuleFactory 或 NormalModuleFactory）的 create 方法创建模块，获取模块相关的 parser、loader、hash 等数据信息。
3. buildModule()：
   调用 module.build() 进行 module 构建。
4. addModuleDependencies()：
   构建成功之后，递归地获取依赖模块并构建（逻辑同\_addModuleChain）。
5. successEntry：
   执行完上述的操作之后，在\_addModuleChain 的回调函数里边调用 succeedEntry 钩子，在这个钩子里边可以获取刚创建的 module。然后将控制权返回给 Compiler。

> 上述阶段完成后，cimpiler 调用了 compilation 的 finish()、seal()，这里我们重点关注 seal 方法。

6. seal()：
   该方法主要完成了 chunk 的构建。主要是收集 modules、chunks，使用 template（在 Compilation 的构建函里初始化了几种 Template：MainTemplate、ChunkTemplate 等）对 chunk 进行编译。entry 属性配置的入口模块使用的是 MainTemplate，里边会加入启动 webpack 多需要的代码，创建并更新 hash 信息等，并调用 emitAsset()会将最终的资源文件全部收集在 assets 对象里边。
7. emitAsset()：
   收集 assets 资源数据，多个插件都有调用该方法。

##### 流程相关

- before-run
- before/after0-compile
- make
- after-emit
- done

##### 监听相关

- watch-run
- watch-close

#### Compilation

Compiler 调用 Compilation 生命周期方法

- addEntry -> addModuleChain
- finish（上报模块错误）
- seal（资源的是生成和优化）

#### Chunk 生成算法

1. webpack 先将 entry 中对应的 module 都生成一个新的 chunk
2. 遍历 module 的依赖列表，将依赖的 module 也加入到 chunk 中
3. 如果一个依赖 module 是动态引入的模块，那么就会根据这个 module 创建一个新的 chunk，继续便利依赖
4. 重复上面的过程，直至得到所有的 chunks

### 文件生成
