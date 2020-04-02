# webpack-demo
webpack-demo


babel-loader的配置
webpack中直接配置options
可以提取到.babelrc中

{
    "presets": ["@babel/preset-react", "@babel/preset-env"], 
    "plugins": [
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }],
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }],
        ["@babel/plugin-transform-runtime"]
    ]
}

@babel/preset-react 支持react
@babel/preset-env 浏览器环境控制
@babel/plugin-proposal-decorators 支持装饰器
@babel/plugin-proposal-class-properties 支持es7比如class A{a=()=>{}}
@babel/plugin-transform-runtime 支持async await
