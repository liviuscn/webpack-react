const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: [
            'lodash', 'aaa'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Demo',
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
            'aaa': './src/a.js',
            'bbb': './src/b.js',
        }
    },
    externals: {
        "bbb": 'bbb'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
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
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};