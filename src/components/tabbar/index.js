import React from 'react'
import classNames from 'classnames'
import styles from './tabbar.less'

const Tabbar = (props) => {
    const handleClick=(e)=>{
        console.log(e.target,'e')
        props.onClick()
    }
    return <div className={styles.root}>
        <ul className={styles.ul} onClick={handleClick}>
            {
                props.children
            }
        </ul>
    </div>
}








Tabbar.Item = (props) => {
    return <li className={classNames(styles.li, {
        active: props.active
    })} >
        {props.children}
    </li>
}

export default Tabbar