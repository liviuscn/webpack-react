import React, { useState, useEffect } from "react";
import classNames from 'classnames'
import styles from './header.less'

export default (props) => {
	let className = classNames({
            'pdv-header': true
    })
    return (<header className={className}>
        <span className='header-left'>返回</span>
        <span className='header-title'>首页</span>
        <span className='header-right'></span>
    </header>)
}