import React, { useState, useEffect, Fragment } from "react";
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'
import './drawer.less'

/* 
    CSSTransition必须为TransitionGroup的根元素才能生效，不能使用Fragment包裹
    注意CSSTransition的属性classNames而不是className
*/
export default (props) => {

    let { open } = props;
    const className = classNames({
        "pdv-drawer": true
    })
    return <TransitionGroup className={className}>
        {
            open && <CSSTransition
                timeout={300}
                classNames="opacity"
            >
                <div onClick={props.onOpenChange}
                    className="drawer-mask" />
            </CSSTransition>
        }
        {
            open && <CSSTransition
                timeout={300}
                classNames="transform"
            >
                <aside className="drawer-sidebar">
                    <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
                    <NavLink to="/login" exact className="nav-link icon-jiantou-copy-copy">登录</NavLink>
                </aside>
            </CSSTransition>
        }
    </TransitionGroup>
}

