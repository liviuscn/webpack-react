import React, { useState, useEffect } from 'react';
import Header from '@/components/header'
import Modal from '@/components/modal'

export default () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  function handleClick(params) {
    
  }
  return <div>
    <Header></Header>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>
      Click me
      </button>
    <Modal>
      <div className="modal">
        <button>Click</button>
      </div>
    </Modal>
  </div>
}