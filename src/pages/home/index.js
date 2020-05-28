import React, { useState } from 'react';
import NavBar from '@/components/navBar'
import Modal from '@/components/modal'
import Drawer from '@/components/drawer'
import Spin from '@/components/spin'
import Swiper from '@/components/swiper'
import Tabbar from '@/components/tabbar'

export default () => {

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLeftClick = () => {
    setOpen(!open)
  }

  return <div >
    <NavBar
      onLeftClick={handleLeftClick}
    >首页</NavBar>
    <Drawer
      open={open}
      onOpenChange={handleLeftClick}
    ></Drawer>
    <Swiper>
      <div style={{ height: 300, backgroundColor: 'red' }}>0000000000000000</div>
      <div style={{ height: 300, backgroundColor: 'yellow' }}>111111111111111</div>
      <div style={{ height: 300, backgroundColor: 'blue' }}>222222222222222</div>
      <div style={{ height: 300, backgroundColor: 'black' }}>333333333333333</div>
    </Swiper>

    <p>You clicked {count} times</p>
    <button onClick={() => {
      setCount(count + 1)
      // setVisible(true)
      Modal.show({
        title: "弹框",
        children: <div>bbbb</div>
      })
    }}>
      Click me
      </button>
    <Modal
      visible={visible}
      onOk={() => { setVisible(false) }}
      onCancel={() => { setVisible(false) }}
    >
      <div>
        hello modal!
      </div>
    </Modal>
    <Spin></Spin>
    <Tabbar>
      <Tabbar.Item active={true}> tab1 </Tabbar.Item>
      <Tabbar.Item> tab2 </Tabbar.Item>
      <Tabbar.Item> tab3 </Tabbar.Item>
      <Tabbar.Item> tab4 </Tabbar.Item>
    </Tabbar>
  </div>
}