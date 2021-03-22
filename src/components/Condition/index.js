import React, { useState, useEffect, Fragment } from "react";
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from 'antd'
import classNames from 'classnames'
import './index.less'

/* 
    CSSTransition必须为TransitionGroup的根元素才能生效，不能使用Fragment包裹
    注意CSSTransition的属性classNames而不是className
*/
export default (props) => {

    const { visible, onOk, onCancle, onReset } = props;

    return <TransitionGroup className="condition-container">
        {
            visible && <CSSTransition
                timeout={300}
                classNames="transform"
            >
                <div className="condition-content-container">
                    <div className="header">
                        <h1>高级查询</h1>
                    </div>
                    <div className="content">
                        {
                            props.children
                        }
                    </div>
                    <div className="footer">
                        <Button type="primary" onClick={onOk}>查询</Button>
                        <Button onClick={onReset}>重置</Button>
                        <Button onClick={onCancle}>取消</Button>
                    </div>
                </div>
            </CSSTransition>
        }
    </TransitionGroup>
}

