var webpack = require("webpack")
var path = require("path")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HappyPack = require("happypack")

const webpackCompileParams = require("./webpackCompileParams")

var env = process.env.NODE_ENV
var projectRootPath = path.resolve(__dirname, "../")
const happyThreadPool = HappyPack.ThreadPool({ size: 12 })
const { modifyVars, aliasModule, start_params } = webpackCompileParams("development")

module.exports = {
    mode: "development",
    devtool: false,
    //devtool: 'source-map',
    entry: {
        edf: [
            "react",
            "react-dom",
            "antd",
            "redux",
            "prop-types",
            "react-redux",
            "ttk-rc-select",
            "ttk-rc-intro",
            "moment",
            "md5",
            "immutable",
            "history",
            // "fastclick",
            "classnames",
            "omit.js",
            "react-keydown",
            "react-resizable",
            "react-json-tree",
            "react-viewer",
            "whatwg-fetch",
            "fixed-data-table-2",
            "react-dnd",
            "react-dnd-html5-backend",
            "immutability-helper",
            "edf-app-loader",
            "edf-meta-engine",
            "edf-component",
            "edf-consts",
            "edf-utils",
            "webapi"
        ]
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
        path: path.join(__dirname, "../edf-vendor"),
        filename: "[name].dll.js",
        library: "[name]_lib"
        // library 与 DllPlugin 中的 name 一致
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
                Theme: path.resolve(
                    projectRootPath,
                    "./component/assets/theme"
                ),
                "@ant-design/icons/lib/dist$": path.resolve(
                    __dirname,
                    "../icon.js"
                )
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
                //     use: ['happypack/loader?id=css']
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
                        limit: 81920
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(env)
        }),
        new webpack.DllPlugin({
            context: __dirname,
            name: "[name]_lib",
            path: path.join(__dirname, "../edf-vendor", "[name].manifest.json")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HappyPack({
            id: "babel",
            loaders: ["babel-loader?cacheDirectory"],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "css",
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
    ]
}
