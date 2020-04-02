const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: [
            'react',
            'react-dom',
            // 'fastclick',
            // 'axios',
            // 'immutable',
            // 'md5',
            // 'react-redux',
            // 'react-router-dom',
            // 'redux',
            // 'redux-thunk'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack react',
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: "./version.txt",
                to: "version.txt",
                toType: "template"
            }
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': './src'
        }
    },
    externals: {

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
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};