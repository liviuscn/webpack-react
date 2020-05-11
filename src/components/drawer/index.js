import React, { useState, useEffect, Fragment } from "react";
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'
import './drawer.less'

export default (props) => {

    const { open } = props;

    const className = classNames({
        "pdv-drawer": true
    })
    return <Fragment>
        {
            <div className={className}>
                <Transition in={open} timeout={300}>
                    {state => (
                        <Fragment>
                            <aside
                                className={`drawer-sidebar transform-${state}`}
                            >
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
                                className={`drawer-mask opacity-${state}`}
                            ></div>
                        </Fragment>
                    )
                    }
                </Transition>

            </div>
        }
    </Fragment>


}