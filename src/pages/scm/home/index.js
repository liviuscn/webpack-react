import React, { useState } from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default (props) => {
  return <Layout className="home-container">
    <Content>
      这里是工作台
    </Content>
  </Layout>
}