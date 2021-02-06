const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * 这些文件将被打包
 * 修改源文件如果不重新打包将不会更新
 *  实例：
 * 
    console.log(require("react"));
    console.log(require('../src/assets/js/a'))

    console.log(require('assets/src/assets/js/b'))
    console.log(require('assets/src/assets/js/c'))
//DLL Mapped Mode 
import beta from '@/assets/js/beta';
//DLL Scoped Mode
import a from 'assets/src/assets/js/a';
import b from 'assets/src/assets/js/b';
import c from 'assets/src/assets/js/c';
import d from 'assets/src/assets/js/d';
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
            "redux-thunk",
            "classnames",
            "./src/assets/js/beta",
            "./build/modules/loadGlobalModules"
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
            '@': path.join(__dirname, '..', 'src'),
            'loadGlobalModules': path.join(__dirname, "../build/modules/loadGlobalModules") 
        }
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
                            localIdentName: '[path]-[name]-[local]-[hash:base64:5]'
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
};