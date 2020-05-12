const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // devtool: 'source-map',
    mode: "production",
    output: {
        filename: '[name].[chunkhash:8].bundle.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.HashedModuleIdsPlugin(),//vendor缓存保持hash不变
        new ManifestPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        },
        // minimizer: [
        //     new UglifyJsPlugin(),
        // ],
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
});