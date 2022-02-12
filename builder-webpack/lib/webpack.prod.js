const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const productConfig = {
    mode: 'production',
    plugins: [
        new CssMinimizerPlugin(),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js',
                    global: 'ReactDom',
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            minSize: 0, // 会被打包出来的文件的最小大小
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2, // 最小的使用次数
                },
            },
        },
    },
};

module.exports = merge(baseConfig, productConfig);
