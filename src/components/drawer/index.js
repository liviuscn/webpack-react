import React, { useState, useEffect, Fragment } from "react";
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'
import './drawer.less'

export default (props) => {

    const { open } = props;

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };
    const slideTransitionStyles = {
        entering: {
            transform: 'translateX(0%)'
        },
        entered: {
            transform: 'translateX(0%)'
        },
        exiting: {
            transform: 'translateX(-100%)'
        },
        exited: {
            transform: 'translateX(-100%)'
        },
    }
    const className = classNames({
        "pdv-drawer": true
    })
    return <div className={className}>
        <Transition in={open} timeout={300}>
            {state => (
                <Fragment>
                    <aside
                        className='drawer-sidebar'
                        style={slideTransitionStyles[state]}>
                        <ul className='drawer-sidebar-list'>
                            <li>
                                <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
                                <span></span>
                            </li>
                            <li>
                                <NavLink to="/login" exact className="nav-link icon-jiantou-copy-copy">登录</NavLink>
                                <span></span>
                            </li>
                        </ul>
                    </aside>
                    <div
                        onClick={props.onOpenChange}
                        className='drawer-mask'
                        style={transitionStyles[state]}
                    ></div>
                </Fragment>
            )
            }
        </Transition>

    </div>
}