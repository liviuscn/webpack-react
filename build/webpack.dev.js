const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    devtool: 'inline-source-map',
    mode: "development",
    entry: {
        app: path.join(__dirname, '..', 'src', 'index.js')
    },
    devServer: {
        contentBase: path.join(__dirname, '..'),
        compress: true,
        port: 9000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        hot: true,
        proxy: {
            "/v1/*": "http://debug.aierp.cn:8085/",
            "/share-oss/*": "http://debug.aierp.cn:8085/"
        }
    },
    plugins: [
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            title: '测试',
            template: './build/index-dev.html',
            filename: 'index.html',
            //chunks: ['app'],//允许添加的chunks
            hash: true,
            //inject: 'body',//允许插件修改哪些内容，包括head与body`
            favicon: './build/favicon.ico', //favicon路径
        }),
        new webpack.HotModuleReplacementPlugin(),//only enable hot in development
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
    }
}