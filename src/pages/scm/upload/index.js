import React from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default () => {
    return <Layout className="upload-container">
        <Content>上传</Content>
    </Layout>
}