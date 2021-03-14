import React from 'react';
import NavBar from '@/components/navBar'
import './index.less'

export default () => {
    return <div>
        <NavBar>注册</NavBar>
        <div>注册账号</div>
        <div>已注册？<a>立即登录</a></div>
    </div>
}