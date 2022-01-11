const path = require('path')

module.exports = {
    entry: {
        bundle: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'), // 指定文件路径
        filename: '[name].js' // 指定文件名称
    },
    mode: 'production'
}