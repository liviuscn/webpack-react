import React from "react";
import classNames from 'classnames'
import './index.less'

export default (props) => {
    return (<div className="pdv-navbar">
        <span className="left" onClick={props.onLeftClick}>{props.left}</span>
        <span className="title">{props.children}</span>
        <span className="right" onClick={props.onRightClick}>{props.right}</span>
    </div>)
}