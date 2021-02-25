import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '@/components/navBar'
import Modal from '@/components/modal'
import Drawer from '@/components/drawer'
import Spin from '@/components/spin'
import Swiper from '@/components/swiper'
import Tabbar from '@/components/tabbar'
import styles from './home.less'
import * as actions from '@/store/home/action'

export default (props) => {
  const dispatch = useDispatch();
  const home = useSelector(state => state.home)
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLeftClick = () => {
    setOpen(!open)
  }

  const handleTabClick = (e) => {
    dispatch(actions.incrementAction)
  }

  return <div >
    <NavBar
      left={false}
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
    <button onClick={() => setCount(count + 1)}>+</button>
    <button onClick={() => {
      // setVisible(true)
      Modal.show({
        title: "弹框",
        children: <div>bbbb</div>
      })
    }}>
      Click me
      </button>
    <div className={styles.hello}>
      hello modal!
      </div>
    <div className='hello'>
      hello modal!
      </div>
    <Modal
      visible={visible}
      onOk={() => { setVisible(false) }}
      onCancel={() => { setVisible(false) }}
    >
      <div>
        hello modal!
      </div>
    </Modal>
    <div>
      <div>数量：{home.count}</div>
      <button onClick={()=>dispatch(actions.incrementAction)}>+</button>
    </div>
    <Spin></Spin>
    <Tabbar onClick={handleTabClick}>
      <Tabbar.Item key='0' active={true}> tab1 </Tabbar.Item>
      <Tabbar.Item key='1'> tab2 </Tabbar.Item>
      <Tabbar.Item key='2'> tab3 </Tabbar.Item>
      <Tabbar.Item key='3'> tab4 </Tabbar.Item>
    </Tabbar>

  </div>
}