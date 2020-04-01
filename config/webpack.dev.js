var webpack = require("webpack")
var path = require("path")
var fs = require("fs")
var HtmlWebpackPlugin = require("html-webpack-plugin")
// const HtmlWebpackPlugin = require("html-webpack-plugin-for-multihtml")
var CopyWebpackPlugin = require("copy-webpack-plugin")
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // webpack 4
// const es3ifyWebpackPlugin = require('es3ify-webpack-plugin-v2')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HappyPack = require("happypack")
// ie9 下单个的css文件超过400k 不被解析
//var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require("webpack-merge")

const webpackCompileParams = require("../webpackCompileParams")

var env = process.env.NODE_ENV

var plugins = []

var projectRootPath = path.resolve(__dirname, "../")
const happyThreadPool = HappyPack.ThreadPool({ size: 12 })

//node环境变量，生产环境：production，开发环境：development
plugins.push(
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env),
        "process.env.MODE_SPLIT": true,
        "process.env.ISDEVELOPMENT": true
    })
)
plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
plugins.push(new webpack.ExtendedAPIPlugin())

plugins.push(
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: merge(require("../edf-vendor/edf.manifest.json"))
    })
)
// dev可关闭
// plugins.push(new es3ifyWebpackPlugin())
// plugins.push(new HtmlWebpackPlugin({
//     title: '金财管家-票据', //标题
//     // favicon: '../assets/img/favicon.ico', //favicon路径
//     filename: 'index.html', //生成的html存放路径，相对于 path
//     template: './build/index-dev.html', //html模板路径
//     chunks: ['bundle'],
//     hash: false,
//     inject: 'body' //允许插件修改哪些内容，包括head与body`
// }))
plugins.push(
    new HtmlWebpackPlugin({
        title: "企业开发平台", //标题
        // favicon: "../assets/img/favicon.ico", //favicon路径
        filename: "index.html", //生成的html存放路径，相对于 path
        template: "./build/index-dev.html", //html模板路径
        chunks: ["bundle"],
        hash: false,
        inject: "body" //允许插件修改哪些内容，包括head与body`
        // multihtmlCache: true
    })
)

// plugins.push(new ExtractTextPlugin("[name].css"))
plugins.push(
    new MiniCssExtractPlugin({
        // webpack 4
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
)

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./version.txt",
            to: "version.txt",
            toType: "file"
        }
    ])
)

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./notfound.html",
            to: "notfound.html",
            toType: "file"
        }
    ])
)
plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./transfer.html",
            to: "transfer.html",
            toType: "file"
        }
    ])
)

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./tplus.html",
            to: "tplus.html",
            toType: "file"
        }
    ])
)
plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./checkLowBrowser.js",
            to: "checkLowBrowser.js",
            toType: "file"
        }
    ])
)

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./sso.html",
            to: "sso.html",
            toType: "file"
        }
    ])
)

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./transreport",
            to: "./transreport",
            ignore: [".*"]
        }
    ])
)

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./admin",
            to: "./admin",
            ignore: [".*"]
        }
    ])
)

plugins.push(
    new HappyPack({
        id: "babel",
        loaders: ["babel-loader?cacheDirectory"],
        threadPool: happyThreadPool
    })
)

// plugins.push(new HappyPack({
//     id: 'htm',
//     loaders: ['html2json-loader?cacheDirectory'],
//     threadPool: happyThreadPool,
// }))

const { modifyVars, aliasModule, start_params } = webpackCompileParams(
    "development"
)

plugins.push(
    new HappyPack({
        id: "css",
        // loaders: ['css-loader', clientInformation'less-loader'],
        loaders: [
            {
                loader: "css-loader"
            },
            {
                loader: "less-loader",
                options: {
                    modifyVars: modifyVars
                }
            }
        ],
        threadPool: happyThreadPool
    })
)
//plugins.push(new marauderDebug())
// dev可关闭
// plugins.push(new LodashModuleReplacementPlugin)

// plugins.push(
//     new webpack.optimize.MinChunkSizePlugin({
//         minChunkSize: 102400 // ~100kb
//     })
// )
// dev可关闭
// plugins.push(new webpack.optimize.UglifyJsPlugin({
//     compress: {
//         warnings: false
//     }
// }))

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./vendor",
            to: "./vendor",
            ignore: [".*"]
        }
    ])
)

plugins.push(
    new CopyWebpackPlugin([
        {
            from: "./edf-vendor",
            to: "./edf-vendor",
            ignore: [".*"]
        }
    ])
)

module.exports = {
    mode: "development",
    devtool: false,
    // devtool: 'source-map',
    entry: {
        bundle: path.resolve(projectRootPath, "./build/index.js")
    },
    optimization: {
        splitChunks: {
            // webpack 4
            chunks: "async",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        // minimizer: [
        //     new UglifyJsPlugin({})
        // ],
        usedExports: true
    },
    output: {
        path: path.join(__dirname, "/dist/"),
        filename: "[name].min.js",
        chunkFilename: "[name].chunk.js"
    },

    resolve: {
        extensions: [".js"],
        alias: Object.assign(
            {
                "edf-app-loader": path.resolve(
                    projectRootPath,
                    "./app-loader/index.js"
                ),
                "edf-meta-engine": path.resolve(
                    projectRootPath,
                    "./meta-engine/index.js"
                ),
                "edf-component": path.resolve(
                    projectRootPath,
                    "./component/index.js"
                ),
                "edf-utils": path.resolve(projectRootPath, "./utils/index.js"),
                webapi: path.resolve(projectRootPath, "./api/index.js"),
                "edf-consts": path.resolve(
                    projectRootPath,
                    "./constant/consts.js"
                ),
                "edf-constant": path.resolve(
                    projectRootPath,
                    "./constant/index.js"
                ),
                eharts: path.resolve(
                    projectRootPath,
                    "./vendor/echarts.min.js"
                ),
                zrender: path.resolve(
                    projectRootPath,
                    "./vendor/zrender.min.js"
                ),
                Theme: path.resolve(projectRootPath, "./component/assets/theme")
                // "@ant-design/icons/lib/dist$": path.resolve(
                //     __dirname,
                //     "../icon.js"
                // )
            },
            aliasModule
        )
    },
    externals: {
        echarts: "echarts",
        zrender: "zrender"
    },
    module: {
        rules: [
            {
                test: /\.(css|less)/,
                // use: ExtractTextPlugin.extract({
                //     use: ["happypack/loader?id=css"]
                // })
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ["happypack/loader?id=babel"]
            },
            {
                test: /\.htm$/,
                exclude: /node_modules/,
                use: ["html2json-loader?id=htm"]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        limit: 8192
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: "./dist/",
        port: 8081,
        host: "0.0.0.0",
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            "/v1/*": {
                // target: "http://xdz.jchl.com/",
                // target: 'http://xdzdemo.jchl.com/',
                target: "http://xdz.aierp.cn:8089",
                //target: 'http://dev-xdz.aierp.cn:8089',
                changeOrigin: true
            },
            "/jcyy/*": {
                // target: 'http://demo-nes.aierp.cn:8089',
                changeOrigin: true
            }
        }
    },
    plugins: plugins
}
