import React from 'react';
import NavBar from 'pdv/navBar'
import './index.less'

export default () => {
    return <div className="user-container">
        <NavBar>用户中心</NavBar>
        <div>姓名：李四</div>
    </div>
}