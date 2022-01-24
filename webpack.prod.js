const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

// 动态的设置 entry 和 htmlWebpackPlugin
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/study-webpack/*/index.js'));

    entryFiles.map((entryFile) => {
        const match = entryFile.match(/study\-webpack\/(.*)\/index\.js/);
        const pageName = match && match[1];

        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/study-webpack/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [pageName, 'vendors', 'commons'],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },
            }),
        );
    });

    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    mode: 'production',
    entry,
    output: {
        path: path.join(__dirname, 'dist'), // 指定文件路径
        filename: '[name]_[chunkhash:8].js', // 指定文件名称
    },
    module: {
        rules: [
            // { test: /\.txt$/, use: 'raw-loader' }, // test 指定匹配规则 use 指定使用的 loader 名称
            {
                test: /.js$/,
                use: ['babel-loader'],
            }, // 解析 js 文件，使用 babel-loader
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ], // loader 的解析是从右到左，从下到上的 这里先解析了 css-loader 再解析了 style-loader
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
                                plugins: [
                                    ['autoprefixer'],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, // 对应设计稿是 750
                            remPrecision: 8, // 转换之后小数点最多保留 8 位
                        },
                    },
                ],
            },
            {
                test: /.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /.(ttf|woff|woff2|otf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CssMinimizerPlugin(),
        new CleanWebpackPlugin(),
        // new ESLintPlugin({
        //     fix: true, // 自动帮助修复
        //     extensions: ['js'],
        //     exclude: 'node_modules'
        // })

        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://now8.gtimg.com/now/lib/16.8.6/react.min.js',
        //             global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://now8.gtimg.com/now/lib/16.8.6/react-dom.min.js',
        //             global: 'ReactDom',
        //         },
        //     ],
        // })
    ].concat(htmlWebpackPlugins),
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        // splitChunks: {
        //     minSize: 0, // 会被打包出来的文件的最小大小
        //     cacheGroups: {
        //         commons: {
        //             name: 'commons',
        //             chunks: 'all',
        //             minChunks: 2 // 最小的使用次数
        //         }
        //     }
        // }
    },
};
