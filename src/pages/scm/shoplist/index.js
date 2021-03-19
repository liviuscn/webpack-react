import React from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default () => {
    return <Layout className="shop-list-container">
        <Content>商品1</Content>
    </Layout>
}