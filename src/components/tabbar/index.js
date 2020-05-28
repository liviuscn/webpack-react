import React from 'react'
import classNames from 'classnames'
import styles from './tabbar.less'

const tabbar = (props) => {

    return <div className={styles.root}>
        <ul className={styles.ul}>
            {
                props.children
            }
        </ul>
    </div>
}

tabbar.Item = (props) => {
    return <li className={classNames(styles.li, {
        active: props.active
    })} >
        {props.children}
    </li>
}

export default tabbar