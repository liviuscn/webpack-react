/* 
    上下文文件
    相当于储存器
*/
class context {

    public _context: Object = {}
    constructor() {
        this._context = {}
    }

    set(key: string, value: string | number) {
        this._context[key] = value
    }

    get(key?: string) {
        return key ? this._context[key] : this._context
    }
}

const instance = new context();

export default instance;