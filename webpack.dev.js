const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')

// 动态的设置 entry 和 htmlWebpackPlugin
const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/study-webpack/*/index.js'))

    entryFiles.map(entryFile => {
        const match = entryFile.match(/study\-webpack\/(.*)\/index\.js/)
        const pageName = match && match[1]

        entry[pageName] = entryFile
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/study-webpack/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [`${pageName}`],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
    })

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    mode: 'development',
    // watch: true,
    // 之后开启监听模式，watchOptions 才有意义
    // watchOptions: {
    //     // 默认为空，不监听的文件或者文件夹，支持正则匹配
    //     // 直接直接忽略掉 node_modules 文件夹下的内容对性能有好处
    //     ignored: /node_modules/,
    //     // 监听到变化发生后会等到 300ms 再去执行，默认 300ms
    //     aggregateTimeout: 300,
    //     // 判断文件是否发生变化是通过不停的循环系统指定的文件有没有发生变化，默认是每秒 1000 次
    //     poll: 1000,
    // },
    entry,
    output: {
        path: path.join(__dirname, 'dist'), // 指定文件路径
        filename: '[name]_[chunkhash:8].js' // 指定文件名称
    },
    module: {
        rules: [
            // { test: /\.txt$/, use: 'raw-loader' }, // test 指定匹配规则 use 指定使用的 loader 名称
            { test: /.js$/, use: 'babel-loader' }, // 解析 js 文件，使用 babel-loader
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] // loader 的解析是从右到左，从下到上的 这里先解析了 css-loader 再解析了 style-loader
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            }
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif)$/,
                use: [
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit: 10240 // 小于 10k 的图片文件会自动转成 base64
                    //     }
                    // } 
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(ttf|woff|woff2|otf|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    devServer: {
        // 服务的基础目录
        static: {
            directory: path.join(__dirname, './dist'),
        },
        // 设置热更新
        hot: true
    },
    devtool: 'source-map'
}