const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    entry: {
        bundle: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'), // 指定文件路径
        filename: '[name].js' // 指定文件名称
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }, // test 指定匹配规则 use 指定使用的 loader 名称
            { test: /.js$/, use: 'babel-loader' }, // 解析 js 文件，使用 babel-loader
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ] // loader 的解析是从右到左，从下到上的 这里先解析了 css-loader 再解析了 style-loader
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240 // 小于 10k 的图片文件会自动转成 base64
                        }
                    }
                ]
            },
            {
                test: /.(ttf|woff|woff2|otf|eot)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        // 服务的基础目录
        static: {
            directory: path.join(__dirname, './dist'),
        },
        // 设置热更新
        hot: true
    }
}