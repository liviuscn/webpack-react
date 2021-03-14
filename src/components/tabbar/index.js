import React from 'react'
import classNames from 'classnames'
import './index.less'

const Tabbar = (props) => {
    const handleClick=(e)=>{
        console.log(e.target,'e')
        props.onClick()
    }
    return <div className="pdv-tabbar">
        <ul className="ul" onClick={handleClick}>
            {
                props.children
            }
        </ul>
    </div>
}








Tabbar.Item = (props) => {
    return <li className={classNames("li", {
        active: props.active
    })} >
        {props.children}
    </li>
}

export default Tabbar