const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer');
const path = require("path");
const webpackCompileParams = require('./webpackCompileParams')
const { aliasModule } = webpackCompileParams('development')

module.exports = {
    devtool: 'inline-source-map',
    mode: "development",
    entry: {
        app: path.join(__dirname, '..', 'src', 'index.js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '..'),//修改为其他后不生效
            manifest: require("../dll/vendor-manifest.json"),
        }),
        new webpack.DllReferencePlugin({
            scope: "assets",
            extensions: [".js", ".jsx"],
            manifest: require("../dll/assets-manifest.json"),
        }),
        new CopyWebpackPlugin([{
            from: "./version.txt",
            to: "version.txt",
            toType: "template"
        }]),
        new CopyWebpackPlugin([{
            from: './dll',
            to: './dll',
            ignore: ['.*']
        }]),
        new HtmlWebpackPlugin({
            title: '开发环境',
            template: './build/index.html',
            filename: 'index.html',
            //chunks: ['app','edf','scm'],//允许添加的chunks
            hash: false,
            //inject: 'body',//允许插件修改哪些内容，包括head与body`
            favicon: './build/favicon.ico', //favicon路径
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: path.resolve(__dirname, '../dll/assets.dll.js'),
                outputPath: './dll',
                publicPath: './dll',
                includeSourcemap: false,
                hash: false
            },
            {
                filepath: path.resolve(__dirname, '../dll/vendor.dll.js'),
                outputPath: './dll',
                publicPath: './dll',
                includeSourcemap: false,
                hash: false
            }
        ]),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            'publicModule': path.join(__dirname, "../build/publicModule"),
            ...aliasModule,
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
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: false,
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
                        sourceMap: true,
                        javascriptEnabled: true
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
        minimize: true
    },
    devServer: {
        contentBase: path.join(__dirname, '..'),
        compress: true,
        open: true,
        hot: true,
        port: 9000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            "/v1/*": {
                target: "http://debug.aierp.cn:8085/",
                secure: false
            }
        }
    },
}