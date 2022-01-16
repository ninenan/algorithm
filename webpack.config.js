const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
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
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
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