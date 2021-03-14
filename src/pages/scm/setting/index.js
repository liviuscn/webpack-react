import React from 'react';
import NavBar from '@/components/navBar'
import './index.less'

export default () => {
    return <div>
        <NavBar>设置</NavBar>
        <ul>
            <li>上传头像</li>
            <li>改变主题</li>
            <li>通知设置</li>
            <li>通用设置</li>
            <li>退出登录</li>
        </ul>
    </div>
}