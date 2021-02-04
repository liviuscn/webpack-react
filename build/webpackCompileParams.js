const path = require("path")
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

const mudules = ['edf', 'por', 'scm'];

function webpackCompileParams(mode) {
    const aliasModule = {};
    mudules.forEach(item => {
        if (mode == 'development') {
            let file = path.resolve(__dirname, `../src/pages/${item}/index.js`);
            if (fs.existsSync(file) && checkRunParams(item)) {
                //存在目录,启动参数中有此模块
                aliasModule[item] = file;
            } else {
                aliasModule[item] = path.resolve(__dirname, `./empty.js`);
            }
        } else {
            aliasModule[item] = path.resolve(__dirname, `./modules/${item}.js`);
        }
    });
    return {
        aliasModule,
        start_params
    }
}

module.exports = webpackCompileParams