import React from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default () => {
    return <Layout className="shop-detail-container">
        <Content>详情</Content>
    </Layout>
}