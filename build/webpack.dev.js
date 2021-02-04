const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const fs = require("fs");

let start_params;
try {
    start_params = JSON.parse(process.env.npm_config_argv)
    if (!start_params || start_params && (!start_params.original || start_params.original.length == 1)) {
        start_params = false;
    }
    start_params = start_params.original.join('').toUpperCase();
    //console.log('start_params：' + start_params)
} catch (err) {
    start_params = false;
}

function checkRunParams(name) {
    let flag;
    if (!start_params) {
        flag = true;
    } else if (start_params.indexOf('--ARG') == -1) {
        flag = true;
    } else {
        flag = start_params.split('=')[1].split(' ').includes(name.toUpperCase());
    }
    console.log(`***********检测${name}模块是否编译***********`, flag);
    return flag;
}

const aliasModule = {};
const mudules = ['edf', 'por', 'scm'];
mudules.forEach(item => {
    let file = path.resolve(__dirname, `../src/pages/${item}/index.js`);
    if (fs.existsSync(file) && checkRunParams(item)) {
        //存在目录,启动参数中有此模块
        aliasModule[item] = file;
    } else {
        aliasModule[item] = path.resolve(__dirname, `./empty.js`);
    }
});

module.exports = {
    devtool: 'inline-source-map',
    mode: "development",
    entry: {
        app: path.join(__dirname, '..', 'src', 'index.js')
    },
    devServer: {
        contentBase: path.join(__dirname, '..'),
        compress: true,
        open: true,
        hot: true,
        port: 9000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            "/v1/*": {
                target: "http://debug.aierp.cn:8085/",
                secure: false
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, '..'),//修改为其他后不生效
            manifest: require("../dll/vendor-manifest.json"),
        }),
        new webpack.DllReferencePlugin({
            scope: "assets",
            extensions: [".js", ".jsx"],
            manifest: require("../dll/assets-manifest.json"),
        }),
        new CopyWebpackPlugin([{
            from: "./version.txt",
            to: "version.txt",
            toType: "template"
        }]),
        new CopyWebpackPlugin([{
            from: './dll',
            to: './dll',
            ignore: ['.*']
        }]),
        new HtmlWebpackPlugin({
            title: '测试',
            template: './build/index-dev.html',
            filename: 'index.html',
            //chunks: ['app'],//允许添加的chunks
            hash: true,
            //inject: 'body',//允许插件修改哪些内容，包括head与body`
            favicon: './build/favicon.ico', //favicon路径
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            ...aliasModule,
        }
    },
    externals: {

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
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
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
    optimization: {
        minimize: true
    }
}