import React, { useState, useEffect,useRef } from 'react';
import Header from '@/components/header'
import Modal from '@/components/modal'

export default () => {
  const modalRef = useRef(null);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  let destroy=()=>{}
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return ()=>{
      destroy()
    }
  });

  return <div>
    <Header></Header>
    <p>You clicked {count} times</p>
    <button onClick={() => {
      setCount(count + 1)
      setVisible(true)
      Modal.show({
          destroy:(el)=>{destroy=el},
          title:"弹框",
          children:<div>aaa</div>
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