const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: "development",
    devServer: {
        contentBase: '../dist',
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.NamedModulesPlugin(),//将使用模块的路径，缓存时hash不变，测试环境使用，速度慢
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'development',
            template: './build/index-dev.html'
        }),
    ]
});