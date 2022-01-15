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
            { test: /\.txt$/, use: 'raw-loader' } // test 指定匹配规则 use 指定使用的 loader 名称
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