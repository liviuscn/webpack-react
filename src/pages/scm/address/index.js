import React from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default () => {
    return <Layout className="address-container">
        <Content>收货地址</Content>
    </Layout>
}