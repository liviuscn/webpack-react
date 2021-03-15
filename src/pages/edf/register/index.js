import React from 'react';
import NavBar from 'pdv/navBar'
import './index.less'

export default () => {
    return <div className="pdv-register">
        <NavBar>注册</NavBar>
        <div>注册账号</div>
        <div>已注册？<a>立即登录</a></div>
    </div>
}