import React from "react";
import classNames from 'classnames'
import styles from './navbar.less'

export default (props) => {

    return (<div className={classNames(styles.navbar)}>
        <span className={styles.left} onClick={props.onLeftClick}>返回</span>
        <span className={styles.title}>首页</span>
        <span className={styles.right} onClick={props.onRightClick}></span>
    </div>)
}