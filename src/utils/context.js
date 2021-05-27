/* 
    上下文文件
    相当于储存器
*/
class context {

    constructor() {
        this._context = {}
    }

    set(key, value) {
        this._context[key] = value
    }

    get(key) {
        return key ? this._context[key] : this._context
    }
}

const instance = new context();

export default instance;