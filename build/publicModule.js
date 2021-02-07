class publicModule {
    constructor() {
        this.modules = {}
        this.loadJSCallback = {}
    }
    set = (key, value) => {
        if (this.loadJSCallback[key]) {
            this.loadJSCallback[key](value)
        } else {
            this.modules[key] = value
        }
    }
    get = (key) => {
        return new Promise((resolve, reject) => {
            if (this.modules[key]) {
                console.log(`${key}已加载`)
                resolve(this.modules[key])
            } else {
                console.log(`${key}未加载`)
                this.loadJSCallback[key] = resolve
            }
        })
    }
}
export default new publicModule();