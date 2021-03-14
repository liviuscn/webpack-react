const argv = JSON.parse(process.env.npm_config_argv)
const moduleName = argv.original[2] ? argv.original[2].slice(2).toLowerCase() : null;
const moduleNames = ['edf', 'scm'];
module.exports.moduleNames = moduleNames;//全部模块
module.exports.moduleName = moduleName;//当前编译的模块