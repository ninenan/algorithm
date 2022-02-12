const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'production',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        // 服务的基础目录
        static: {
            directory: path.join(__dirname, './dist'),
        },
        // 设置热更新
        hot: true,
    },
    devtool: 'source-map',
};

module.exports = merge(baseConfig, devConfig);
