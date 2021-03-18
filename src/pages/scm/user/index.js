import React from 'react';
import { Popover, Button, Layout } from 'antd';
const { Header, Content, Sider, Footer } = Layout
import './index.less'
const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
export default () => {

    return <Layout className="user-container">
        <Content>
            <div className="user-body">
                <Popover content={content} title="Title">
                    <Button type="primary">Hover me</Button>
                </Popover>
                <div className="user-content">
                    constent
            </div>
            </div>
        </Content>
    </Layout>
}