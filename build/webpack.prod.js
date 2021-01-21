const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: false,
    mode: "production",
    entry:{
        edf:[]
    },
    output: {
        filename: '[name].[chunkhash:8].bundle.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '..'),//修改为其他后不生效
            manifest: require("../dll/vendor-manifest.json"),
        }),
        new webpack.DllReferencePlugin({
            scope: "assets",
            manifest: require("../dll/assets-manifest.json"),
            extensions: [".js", ".jsx"]
        }),
        new CleanWebpackPlugin(["dist"], {
            root: path.join(__dirname, '..')
        }),
        new webpack.HashedModuleIdsPlugin(), //vendor缓存保持hash不变
        new ManifestPlugin(),
        new HtmlWebpackPlugin({
            title: 'production',
            template: './index.html'
        }),
        new CopyWebpackPlugin([{
            from: '../dll',
            to: './dll',
            ignore: ['.*']
        }])
    ],
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});