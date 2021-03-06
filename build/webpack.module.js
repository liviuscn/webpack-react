/**
 * 设置scope后要使用scope引入文件
 * 
 */

const path = require("path");
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpackCompileParams = require('./webpackCompileParams');
const argv = JSON.parse(process.env.npm_config_argv);
const moduleName = argv.original[2] ? argv.original[2].slice(2).toLowerCase() : null;
if (!moduleName) {
    console.error("请指定构建模块");
    return;
}
console.log('开始构建', moduleName, '模块');
const { aliasModule } = webpackCompileParams();
module.exports = {
    mode: "production",
    entry: {
        [moduleName]: path.join(__dirname, '..', 'src', 'pages', moduleName, 'index.js')
    },
    output: {
        filename: '[name].[chunkhash:8].bundle.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname, '..', 'dist', moduleName),
        publicPath: `/${moduleName}/`,
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), `dist/${moduleName}/*`)]
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProgressPlugin(),
        new WebpackManifestPlugin(),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '..'),//修改为其他后不生效
            manifest: require("../dll/vendor-manifest.json"),
        }),
        new webpack.DllReferencePlugin({
            scope: "assets",
            extensions: [".js", ".jsx"],
            manifest: require("../dll/assets-manifest.json"),
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            'publicModule': path.join(__dirname, "../build/publicModule"),
            'pdv': path.join(__dirname, '..', 'src', 'pdv-components'),
            ...aliasModule
        }
    },
    externals: {

    },
    module: {
        rules: [{
            test: /\.less$/i,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: "css-loader"
                },
                {
                    loader: "postcss-loader"
                },
                {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true,
                    },
                },
            ],
        },
        {
            test: /\.css$/i,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: "postcss-loader"
                },
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        },
        {
            test: /\.(ts|tsx)?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'async'
        },
        minimizer: [
            new CssMinimizerPlugin(),//生产模式压缩css
            new UglifyJsPlugin(),//生产模式压缩js
        ],
    },
};