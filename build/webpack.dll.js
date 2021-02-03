const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * 这些文件将被打包
 * 修改源文件如果不重新打包将不会更新
 *  实例：
    console.log(require("react"));
    console.log(require('../src/assets/js/a'))
    console.log(require('assets/src/assets/js/b'))
    console.log(require('assets/src/assets/js/c'))
 */
module.exports = {
    mode: "production",
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        vendor: [
            "react",
            "react-dom",
            "redux",
            "react-redux",
            "react-router-dom",
            "react-transition-group",
            "redux-immutable",
            "redux-thunk",
            "./src/assets/js/beta",
        ],
        assets: [
            //验证Scoped Mode
            "./src/assets/js/a",
            "./src/assets/js/b",
            "./src/assets/js/c",
            "./src/assets/js/d",
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'dll'),
        filename: '[name].dll.js',
        library: "[name]_[fullhash]"
        // library 与 DllPlugin 中的 name 一致
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'dll/*')]
        }),
        new webpack.DllPlugin({
            context: path.join(__dirname, '..'),
            path: path.join(__dirname, '..', 'dll', '[name]-manifest.json'),
            name: "[name]_[fullhash]"
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    }
};