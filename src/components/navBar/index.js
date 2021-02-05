import React from "react";
import classNames from 'classnames'
import styles from './navbar.less'

export default (props) => {
    return (<div className={classNames(styles.navbar)}>
        <span className={styles.left} onClick={props.onLeftClick}>{props.left}</span>
        <span className={styles.title}>{props.children}</span>
        <span className={styles.right} onClick={props.onRightClick}>{props.right}</span>
    </div>)
}