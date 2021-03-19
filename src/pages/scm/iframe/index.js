import React from 'react'
import { Layout } from 'antd'
import './index.less'

export default (props) => {
    return <Layout class='iframe-container'>
        <iframe class="iframe" src="http://w.yyuap.com/console/?locale=zh_CN&env=bip&serviceCode=iw_console_modelservice&refimestamp=1616120043730#/modelservice" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true">
            iframe
        </iframe>
    </Layout>
}