import React from "react";
import classNames from 'classnames'
import './navbar.less'

export default (props) => {
	let className = classNames({
            'pdv-navbar': true,
            'navbar-light':true
    })
    return (<div className={className}>
        <span className='navbar-left' onClick={props.onLeftClick}>返回</span>
        <span className='navbar-title'>首页</span>
        <span className='navbar-right' onClick={props.onRightClick}></span>
    </div>)
}