import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'

import './modal.less';
// 在 DOM 中有两个容器是兄弟级 （siblings）
const modalRoot = document.getElementById('modal-root');

//通过方法来弹出modal
export default (props)=>{
        if(!props){
           props={
                    
         }}
        let {title="提示",okText="确定",cancelText="取消"}=props
        
        const el = document.createElement('div');
        modalRoot.appendChild(el);

        let className = classNames({
            'pdv-modal-root': true
        })

        const handleOk=()=>{
            props.onOk&&props.onOk()
            ReactDOM.unmountComponentAtNode(el)
            modalRoot.removeChild(el);
        }

        const handleCancel=()=>{
            props.onCancel&&props.onCancel()
            ReactDOM.unmountComponentAtNode(el)
            modalRoot.removeChild(el);
        }    

        ReactDOM.render(
            <div className={className}>
                <div className='pdv-modal-mask'></div>
                <div className='pdv-modal-wrap'>
                    <div className='pdv-modal'>
                        <div className='pdv-modal-content'>
                            <button className='pdv-modal-close' onClick={handleCancel}>
                                关闭
                            </button>
                            <div className='pdv-modal-header'>
                                <span className='pdv-modal-header-title'>{title}</span>
                            </div>
                            <div className='pdv-modal-body'>
                                {props.children}
                            </div>
                            <div className='pdv-modal-footer'>
                                <button onClick={handleOk}><span>{okText}</span></button>
                                <button onClick={handleCancel}><span>{cancelText}</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            el
        );
}
    
