const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        library: ['react', 'react-dom'],
        // 这里还可以添加比的业务基础包
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, 'dist/library'),
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, 'dist/library/[name].json'),
            name: '[name]_[hash]',
        }),
    ],
};
