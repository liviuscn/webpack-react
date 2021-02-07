const path = require("path")
const fs = require("fs");
const { moduleNames } = require('./config');
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

function webpackCompileParams(mode) {
    const aliasModule = {};
    moduleNames.forEach(item => {
        if (mode == 'development') {
            let file = path.resolve(__dirname, `../src/pages/${item}/index.js`);
            if (fs.existsSync(file) && checkRunParams(item)) {
                //存在目录,启动参数中有此模块
                aliasModule[item] = file;
            } else {
                aliasModule[item] = path.resolve(__dirname, `./empty.js`);
            }
        } else {
            let file = path.resolve(__dirname, `../dist/${item}.js`)
            if (!fs.existsSync(file)) {
                let result = `import publicModule from 'publicModule'\nexport default publicModule.get('${item}')`
                fs.writeFileSync(file, result, 'utf8', (err) => {
                    if (err) {
                        console.error(err, `create ${item}.js error`);
                    } else {
                        console.log(`create ${item}.js`)
                    }
                });
            }
            aliasModule[item] = file;
        }
    });
    return {
        aliasModule,
        start_params
    }
}

module.exports = webpackCompileParams