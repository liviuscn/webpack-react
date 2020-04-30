const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    entry: {
        app: path.join(__dirname, '..', 'src', 'index.js'),
        vendor: [
            'react',
            'react-dom'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack react',
            template: './index.html'
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
            '@': path.join(__dirname, '..', 'src')
        }
    },
    externals: {

    },
    module: {
        rules: [
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
};