const path = require('path');
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const moduleNames = fs.readdirSync(path.resolve(__dirname, '../src/pages'));
console.log('-------------------------------------')
console.log('---------开始合并业务资源------------')
console.log('-------------------------------------')

let arr = [];
moduleNames.forEach(item => {
    let res = fs.readFileSync(path.join(__dirname, `../dist/${item}/manifest.json`))
    const result = JSON.parse(res);
    const modulePath = result[`${item}.js`]
    arr.push({
        filepath: path.resolve(__dirname, `../dist${modulePath}`),
        outputPath: `./${item}`,
        publicPath: `./${item}`,
        includeSourcemap: false,
        hash: true
    })
});
module.exports = {
    devtool: false,
    mode: "production",
    entry:{},
    output: {
        path: path.resolve(__dirname, '..', 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '生产环境',
            template: './build/index.html',
            filename: 'index.html',
            //chunks: ['app'],//允许添加的chunks
            hash: true,
            //inject: 'body',//允许插件修改哪些内容，包括head与body`
            //favicon: './build/favicon.ico', //favicon路径
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: path.resolve(__dirname, '../dll/assets.dll.js'),
                outputPath: './dll',
                publicPath: './dll',
                includeSourcemap: false,
                hash: true
            },
            {
                filepath: path.resolve(__dirname, '../dll/vendor.dll.js'),
                outputPath: './dll',
                publicPath: './dll',
                includeSourcemap: false,
                hash: true
            },
            ...arr,
            {
                filepath: path.resolve(__dirname, '../dist/*.bundle.js'),
                outputPath: './',
                publicPath: './',
                includeSourcemap: false,
                hash: true
            },
        ]),
    ],
};