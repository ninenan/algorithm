const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        library: [
            'react',
            'react-dom',
        ],
        // 这里可以添加别的分包的内容
        // businessLibrary: [] // 业务包
    },
    output: {
        filename: '[name]_[chunkhash].dill.js',
        path: path.join(__dirname, 'build/library'),
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_[hash]',
            path: path.join(__dirname, 'build/library/[name].json'),
        }),
    ],
};
