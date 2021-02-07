const argv = JSON.parse(process.env.npm_config_argv)
let moduleName = null

switch (argv.original[2]) {
    case '--edf':
        moduleName = 'edf';
        break;
    case '--por':
        moduleName = 'por';
        break;
    case '--scm':
        moduleName = 'scm';
        break;
    default:
        moduleName = null;
}
const moduleNames = ['edf', 'por', 'scm'];
module.exports.moduleNames = moduleNames;//全部模块
module.exports.moduleName = moduleName;//当前编译的模块