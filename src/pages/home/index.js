import React, { useState } from 'react';
import NavBar from '@/components/navBar'
import Modal from '@/components/modal'
import Drawer from '@/components/drawer'
import Spin from '@/components/spin'

export default () => {

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const handleLeftClick = () => {
    setOpen(!open)
  }

  return <div>
    <NavBar
      onLeftClick={handleLeftClick}
    >首页</NavBar>

    <Drawer
      open={open}
      onOpenChange={handleLeftClick}
    ></Drawer>

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
  </div>
}