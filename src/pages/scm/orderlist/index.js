import React from 'react'
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default () => {
    return <Layout className="order-list-container">
        <Content>我的订单</Content>
    </Layout>
}