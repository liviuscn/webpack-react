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

const argv = JSON.parse(process.env.npm_config_argv)
let argName = null

switch (argv.original[2]) {
    case '--edf':
        argName = 'edf';
        break;
    case '--por':
        argName = 'por';
        break;
    case '--scm':
        argName = 'scm';
        break;
    default:
        argName = null;
}
console.log('开始构建', argName, '模块')

module.exports = {
    mode: "production",
    entry: {
        [argName]: path.join(__dirname, '..', 'src', 'pages', argName, 'index.js')
    },
    output: {
        filename: '[name].[chunkhash:8].bundle.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname, '..', 'dist', argName),
        publicPath: `/${argName}/`
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), `dist/${argName}/*`)]
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
        }),
        new HtmlWebpackPlugin({
            title: '测试',
            template: './build/index-dev.html',
            filename: 'index.html',
            //chunks: ['app'],//允许添加的chunks
            hash: true,
            //inject: 'body',//允许插件修改哪些内容，包括head与body`
            favicon: './build/favicon.ico', //favicon路径
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    externals: {

    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: {
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                        postcssOptions: {
                            plugins: [
                                ['autoprefixer', {}]
                            ]
                        }
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                }
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
            chunks:'async'
        },
        minimizer: [
            new CssMinimizerPlugin(),//生产模式压缩css
            new UglifyJsPlugin(),//生产模式压缩js
        ],
    },
};