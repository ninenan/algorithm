const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const ESLintPlugin = require('eslint-webpack-plugin');

const projectRoot = process.cwd();
const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(projectRoot, './src/study-webpack/*/index.js'));

    entryFiles.forEach((entryFile) => {
        const match = entryFile.match(/study-webpack\/(.*)\/index\.js/);
        const pageName = match && match[1];

        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(projectRoot, `./src/study-webpack/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: [`${pageName}`],
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
    entry,
    output: {
        path: path.join(projectRoot, 'dist'), // 指定文件路径
        filename: '[name]_[chunkhash:8].js', // 指定文件名称
    },
    module: {
        rules: [
            // { test: /\.txt$/, use: 'raw-loader' }, // test 指定匹配规则 use 指定使用的 loader 名称
            { test: /.js$/, use: ['babel-loader'] }, // 解析 js 文件，使用 babel-loader
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
                                plugins: ['autoprefixer'],
                            },
                        },
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
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
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                    },
                }],
            },
        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            fix: true, // 自动帮助修复
            extensions: ['js'],
            exclude: 'node_modules',
        }),
        new FriendlyErrorsWebpackPlugin(),
        // 用于捕获构建状态
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                // 构建失败会触发
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    console.log('stats :>> ', stats.compilation.errors);
                    process.exit(2);
                }
            });
        },
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
};
