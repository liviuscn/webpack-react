//import 'babel-polyfill'
import "url-polyfill"
//import FastClick from 'fastclick'
import { config, start, componentFactory } from "edf-meta-engine"
import * as edfComponents from "edf-component"
import raf from "raf"
import myConfig from "./config"
//import registerServiceWorker from './registerServiceWorker'
// import promise from 'es6-promise'
raf.polyfill()

if (typeof _hmt == "undefined") window._hmt = []
if (typeof _maq == "undefined") window._maq = []

import "../global/global.js"
// import useBA from 'useBA'
import useEDF from "useEDF"
import useINVOICES from "useINVOICES"
import useBOVMS from "useBOVMS"
import useYYGL from "useYYGL"
import useSTOCK from "useSTOCK"

const arr = [useEDF, useINVOICES, useBOVMS, useYYGL, useSTOCK]
// const arr = [useEDF, useSTOCK, useYYGL]
Promise.all(arr).then(res => {
    let apps = {}
    // console.log('index.js---', res)
    res.forEach(item => {
        apps = { ...apps, ...item }
    })
    if (window.singleApp) {
        const singleApp = window.singleApp
        apps = { ...apps, ...singleApp }
    }
    //note-end
    apps.config = options => {
        Object.keys(options).forEach(key => {
            const reg = new RegExp(`^${key == "*" ? ".*" : key}$`)
            Object.keys(apps).forEach(appName => {
                if (appName != "config") {
                    if (reg.test(appName) && apps[appName].config) {
                        apps[appName].config(options[key])
                    }
                }
            })
        })
    }

    // promise.polyfill()

    apps.config({ "*": { apps } })

    config(myConfig({ apps }))

    Object.keys(edfComponents).forEach(key => {
        componentFactory.registerComponent(key, edfComponents[key])
    })

    start()
})
//service worker是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务
//registerServiceWorker()
//FastClick.attach(document.body)
