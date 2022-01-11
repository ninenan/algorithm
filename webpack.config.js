const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'), // 指定文件路径
        filename: 'bundle.js' // 指定文件名称
    },
    mode: 'production'
}