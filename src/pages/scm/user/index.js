import React from 'react';
import NavBar from 'pdv/navBar'
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

    return <div className="user-container">
        <NavBar>用户中心</NavBar>
        <div className="user-body">
            <Popover content={content} title="Title">
                <Button type="primary">Hover me</Button>
            </Popover>
            <div className="user-content">
                constent
            </div>
        </div>
    </div>
}