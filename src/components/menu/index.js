import React, { useState, useEffect } from "react";
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'
import styles from './memu.less'

export default (props) => {
    const [inProp, setInProp] = useState(false);

    const duration = 300;

    const defaultStyle = {
        position: 'absolute',
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0.5,
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'red'
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };
    return <header className='header-container'>
        <span className='header-left-icon' onClick={() => setInProp(!inProp)}>click</span>
        <span className='header-title'>title</span>
        <span className='header-right-icon'></span>
        <Transition in={inProp} timeout={duration}>
            {state => (
                inProp && <aside style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    I'm a fade Transition!
                    <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">首页</NavLink>
                    <NavLink to="/" exact className="nav-link icon-jiantou-copy-copy">购物车</NavLink>
                </aside>
            )}
        </Transition>
    </header>
}