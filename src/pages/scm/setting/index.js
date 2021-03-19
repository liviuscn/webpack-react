import React from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default () => {
    return <Layout className="setting-container">
        <Content>
            <ul>
                <li>改变主题</li>
                <li>通知设置</li>
                <li>通用设置</li>
                <li>退出登录</li>
            </ul>
        </Content>
    </Layout>
}