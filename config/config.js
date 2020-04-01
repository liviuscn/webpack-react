import {
    Toast,
    Notification,
    Modal,
    Popconfirm,
    localeWrapper,
    Alert
} from "edf-component"
import { fetch, environment } from "edf-utils"

//import '../mock.js' //脱离后台测试，启用mock，否则这行注释

var _options = {}

//配置fetch
fetch.config({
    //mock: true, //脱离后台测试，启用mock，否则这行注释
    //token:'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJbNjU4MDgyMDEwMTg2NjQ5Niw2NTg1NDU5NDgwMjIyNzIwLFwiMTAzNzE1NTgzMTY5NjIxOTVcIiwxMDAsXCJkYl8xMV9rZXlfc3ByaW5nXCIsMTAwMDEwMDAsbnVsbCxcIjBcIl0iLCJleHAiOjE1NTg3Njg2MDksImlhdCI6MTU1ODMzNjYwOX0.SAu67TR2ndVphN3yRthMSJPhD2NSb9UgDnt_lxj2rWJfYht1ZXLCE_tV6LjVfceKBW-Dlsi6xrYxv9oKj9iLLg',
    // token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJbNjU4MDA2MTcwMjg5MDQ5Niw2NTgwMDYzMDkzODg5MDI0LFwiMTAzNzE1NTg4NzU4ODI5OTJcIiwxMDAsXCJkYl8xX2tleV9zcHJpbmdfZGVmYXVsdFwiLDEwMDAxMDAwLG51bGwsXCIwXCJdIiwiZXhwIjoxNTU5MzU1NTE0LCJpYXQiOjE1NTg5MjM1MTR9.GqRdheIFJaFQDdPCRj7yc-AhzBiLSuH_gJhCTD4HCXVVBxbWACfz6GcBIfm9X1OY1QS5C2hiwoYYS0glQ1lUzg',
    before: (url, data, headers) => {
        // console.log(url,data,headers)
    },
    //fetch支持切面扩展（before,after），对restful api统一做返回值或者异常处理

    after: (response, url, data, header) => {
        if (url.indexOf("/v1/edf/dzgl/initPortal") > -1 && response.value) {
            if (!response.value.menuTreeMemory) {
                response.value.menuTreeMemory = {
                    orgId: response.value.org && response.value.org.id,
                    state: true
                }
            }
        }
        if (response.result) {
            if (response.token) {
                //登录后设置accessToken,根据需要调整
                fetch.config({
                    token: response.token
                })
            }
            if (url && url.indexOf("/v1/edf/user/login") > -1) {
                return {
                    token:
                        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJbNjg1NzMyOTQwMDIxOTY0OCw3MDIyOTI1NTI3ODMwNTI4LFwiMTA1MDE1ODE0OTI0NDU4NTFcIiwxMTQsXCJkYl8xX2tleV9zcHJpbmdfZGVmYXVsdFwiLDEwMDE0MDAxLG51bGwsXCIxXCIsNzAyMjkyNTUyNzgzMDUyOF0iLCJleHAiOjE1ODE5MjcxNTMsImlhdCI6MTU4MTQ5NTE1M30.g8N9JIV6Ok33ACWskDB-m9wZsLfoiWbxkwUrh4D-chqf4reyNGDE8iNfLXUPsG2mRLTLg19EmUMOSlB-TqpRYA",
                    result: true,
                    value: {
                        id: 6857329400219648,
                        mobile: "13580525027",
                        nickname: "系统管员-广东",
                        password: "17340166f36788f43458492cfbf57f05",
                        pageStyle: 1,
                        skin: "#0066B3",
                        appId: 114,
                        appkey: 10014001,
                        requestUrl: "xdz.aierp.cn",
                        isCustomerManager: false,
                        ip: "113.65.208.44",
                        captcha: "",
                        token: {
                            userId: 6857329400219648,
                            orgId: 7022925527830528,
                            versionId: "10501581492445851",
                            appId: 114,
                            appKey: 10014001,
                            dbKey: "db_1_key_spring_default",
                            orgType: "1",
                            dljgId: 7022925527830528
                        },
                        sysOrg: {
                            id: 7022925527830528,
                            name: "CP广东_测试环境A",
                            version: 1,
                            ts: "2020-02-12 16:07:27.0",
                            creator: 6857329400219648,
                            accountingStandards: 2000020001,
                            enabledYear: 2019,
                            enabledMonth: 7,
                            vatTaxpayer: 2000010001,
                            appId: 114,
                            appKey: 10014001,
                            ucOrgId: "354289673910280200",
                            orderCount: 0,
                            orgType: 1,
                            vatTaxpayerChangeState: 0,
                            hasAuth: false,
                            xzqhdm: "440101",
                            contactsName: "陈皮",
                            contactsPhone: "13580525029",
                            contactsMail: "77889@163.com",
                            contactsAddress: "",
                            helpCode: "",
                            applySimplyAccountingStandards: false,
                            createTime: "2019-07-23",
                            lastLoginTime: "2020-02-12 16:07:27",
                            expireTime: "9999-12-31"
                        },
                        appSource: { appKey: 10014001, appLogo: "logo_dz.png" }
                    }
                }
            }
            return response.value
        } else if (response.sysNetException) {
            response.error = {}
            response.error.code = 504
            response.error.message = "网络异常"
            return response
        } else if (response.networkException) {
            window.location.href = gotoLogin("notfound.html")
            Toast.destory()
            Toast.error("服务器正在维护中,请稍后访问!")
            return false
        } else {
            if (data && data.isReturnValue) {
                return response
            } else {
                let errorCode = ""
                if (response.error.code == 50000) return 50000
                if (response.error && response.error.code) {
                    errorCode = response.error.code
                }
                if (environment.isTestMode()) {
                    //开发环境
                    if (errorCode == "40100") {
                        window.location.href = gotoLogin()
                    } else {
                        Modal.error({
                            title: "错误:" + errorCode || "",
                            okText: "关闭",
                            width: 600,
                            bodyStyle: "height:300px;overflow:auto;",
                            content: response.error.message
                        })
                    }
                } else {
                    //正式环境
                    Toast.error(response.error.message)
                    if (errorCode == "40100") {
                        window.location.href = gotoLogin()
                    }
                    //Modal.error({ title: '错误：', okText: '关闭', content: response.error.code })
                }
                if (url && url.indexOf("/v1/edf/user/login") > -1) {
                    return response
                }
                return
            }
        }
    }
})

function config(options) {
    Object.assign(_options, options)

    //对应用进行配置，key会被转换为'^<key>$'跟app名称正则匹配
    _options.apps &&
        _options.apps.config({
            "*": {
                //webapi,//正式网站应该有一个完整webapi对象，提供所有web请求函数
                webProvider: fetch.mock,
                //dbProvider: websql,
                dbConfig: {
                    name: "test"
                }
            },
            "inv-app-root": {
                startAppName: "inv-app-ledger-list"
            },
            "edfx-app-root": {
                startAppName: "edfx-app-login"
            }
        })

    //require('./mock.js')
    _options.targetDomId = "app" //react render到目标dom
    // _options.startAppName = 'inv-app-root' //启动app名，需要根据实际情况配置
    _options.startAppName = "edfx-app-root" //启动app名，需要根据实际情况配置

    _options.toast = Toast //轻提示使用组件，edf-meta-engine使用
    _options.notification = Notification //通知组件
    _options.modal = Modal //模式弹窗组件
    _options.popconfirm = Popconfirm //confirm提示组件
    _options.alert = Alert //alert
    _options.rootWrapper = child => localeWrapper("zh-CN", child) //国际化处理
    return _options
}

function gotoLogin(url) {
    if (typeof url == "string") {
        return (
            window.location.protocol + "//" + window.location.host + "/" + url
        )
    }
    return window.location.protocol + "//" + window.location.host
}

config.current = _options

export default config
