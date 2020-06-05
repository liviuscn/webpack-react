var path = require('path');
var webpack = require('webpack');
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
            "./src/assets/js/alpha",
            "./src/assets/js/a",
        ],
        assets: [
            //纯粹是为了验证这种写法
            "./src/assets/js/b",
            "./src/assets/js/c",
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'dll'),
        filename: '[name].dll.js',
        library: "[name]_lib"
        // library 与 DllPlugin 中的 name 一致
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': JSON.stringify('production') },
        }),
        new webpack.DllPlugin({
            context: path.join(__dirname, '..'),
            path: path.join(__dirname, '..', 'dll', '[name]-manifest.json'),
            name: "[name]_lib",
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader',
                }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif|ico)$/,
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
};