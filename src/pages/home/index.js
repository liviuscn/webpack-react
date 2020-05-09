import React, { useState, useEffect } from 'react';
import Header from '@/components/header'
import Modal from '@/components/modal'

export default () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return <div >
    <Header></Header>
    <p>You clicked {count} times</p>
    <button onClick={() => {
      setCount(count + 1)
      setVisible(true)
      Modal.show({
          title:"弹框",
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
  </div>
}