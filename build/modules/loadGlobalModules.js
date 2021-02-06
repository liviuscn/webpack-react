var getCurrentTime = function (type) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    if (type == 1) {
        return "" + date.getFullYear() + '-' + month + '-' + strDate + "  " + hour + ":" + minute + ":" + second;
    } else {
        return "" + date.getFullYear() + month + strDate + "" + hour + "" + minute;
    }

};

class moduleGlobal {
    constructor() {
        this.loadsCallback = {}
        this.manifest = null
        this.loadJSCallback = {}
        this.modules = {}
        this.loadGlobal();
    }

    moduleName = ['edf', 'por', 'scm']

    loadGlobal = () => {
        console.log('1、loadGlobal')
        const script = document.createElement('script');
        script.src = `./modulemanifest.js?${getCurrentTime()}`
        script.onerror = function () {
            console.error("请先进行代码合并")
        }
        script.onload = () => {
            if (window.moduleManifest) {
                this.manifest = window.moduleManifest
                this.publish();
                this.loadJS();
            }
        }
        document.body.appendChild(script)
    }

    get = (module) => {
        if (this.manifest) {
            return Promise.resolve(this.manifest[module])
        }
        return new Promise((resolve, reject) => {
            this.loadsCallback[module] = resolve
        })
    }
    publish = () => {
        console.log('3、publish')
        if (this.manifest) {
            Object.entries(this.loadsCallback).forEach(([key, callBack]) => {
                callBack(this.manifest[key])
            })
        }
    }

    //因为加载js肯定只有一次，不需要多次加载所以和css有些不一样
    loadJS = () => {
        console.log('4、loadJS')
        const path = this.manifest['mergeJsName']
        const script = document.createElement('script')
        script.type = "text/javascript"
        script.async = true
        script.defer = true
        script.src = `${path}`

        script.onerror = function () {
            console.error('loadJs error')
            if (this.publishJS) {
                this.publishJS()
            }
        }
        script.onload = () => {
            this.publishJS()
        }
        document.body.appendChild(script)
    }

    //加载顺序
    publishJS = () => {
        console.log('6、publisJS')
        Object.entries(this.loadJSCallback).forEach(([key, callBack]) => {
            callBack(this.modules[key] ? this.modules[key] : [])
        })
    }

    //存放modeles
    callback = (result, name) => {
        console.log(`5、callback-${name}`)
        this.modules[name] = result
    }

    //读取module
    getJS = (module) => {
        console.log(`2、getJS-${module}`)
        return new Promise((resolve, reject) => {
            if (this.modules[module]) {
                console.log(`${module}已加载完成`)
                resolve(this.modules[module])
            } else {
                console.log(`${module}还未加载`)
                this.loadJSCallback[module] = resolve
            }
        })
    }
}

const result = new moduleGlobal();

export default result;