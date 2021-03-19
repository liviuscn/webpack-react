import React from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default () => {
    return <Layout className="shopcard-container">
        <Content>
            购物车
        </Content>
    </Layout>
}