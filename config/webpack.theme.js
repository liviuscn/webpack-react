var webpack = require("webpack")
var path = require("path")
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
var blueStyle = [path.resolve(projectRootPath, "./assets/styles/blue.less")]

//node环境变量，生产环境：production，开发环境：development
plugins.push(
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env),
        "process.env.MODE_SPLIT": true
    })
)
// plugins.push(new es3ifyWebpackPlugin())
// plugins.push(new LodashModuleReplacementPlugin)
// plugins.push(new ExtractTextPlugin("[name].css"));
plugins.push(
    new MiniCssExtractPlugin({
        // webpack 4
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
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
// plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//         compress: {
//             warnings: false
//         }
//     })
// )

function mergeTheme(arr, type) {
    const newArr = [...arr]
    const modules = ["bovms", "invoices", "stock"].concat([
        "ba",
        "edf",
        "yygl",
        "gl"
    ])

    if (
        (start_params && start_params.toUpperCase() == "RUNTHEME") ||
        !start_params
    ) {
        modules.forEach(item => {
            newArr.push(
                path.resolve(
                    projectRootPath,
                    `./apps/${item}/theme/${type}.less`
                )
            )
        })
    } else {
        modules.forEach(item => {
            item = item.toUpperCase()
            if (start_params && start_params.includes(item)) {
                newArr.push(
                    path.resolve(
                        projectRootPath,
                        `./apps/${item}/theme/${type}.less`
                    )
                )
            }
        })
    }
    return newArr
}
module.exports = {
    mode: "development",
    devtool: false,
    // devtool: 'source-map',
    entry: {
        // businessBlueTheme: businessBlue.concat(mergeTheme(['./assets/apps/businessBlue.less'], 'businessBlue')),
        blueTheme: blueStyle.concat(
            mergeTheme(
                [path.resolve(projectRootPath, "./assets/apps/blue.less")],
                "blue"
            )
        ),
        icon: path.resolve(
            projectRootPath,
            "./component/assets/style/iconset.less"
        )
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
        path: path.join(__dirname, "../edf-vendor/"),
        filename: "[name].css"
    },

    resolve: {
        extensions: [".less"],
        alias: {
            Theme: path.resolve(projectRootPath, "./component/assets/theme")
            // "@ant-design/icons/lib/dist$": path.resolve(__dirname, "../icon.js")
        }
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
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
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
    plugins: plugins
}
