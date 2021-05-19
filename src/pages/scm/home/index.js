import React, { useState, useEffect } from 'react';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default (props) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(1)
    console.log(count)
    setCount(2)
    console.log(count)
    setCount(3)
    console.log(count)
    setCount(4)
    console.log(count)
    setCount(5)
    console.log(count)
  })


  return <Layout className="home-container">
    <Content a>
      这里是工作台
    </Content>
  </Layout>
}