import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import './index.less';

// 在 DOM 中有两个容器是兄弟级 （siblings）
const modalRoot = document.getElementById('modal-root');

//通过方法来弹出modal
export default (props) => {
    if (!props) {
        props = {}
    }
    let { title = "提示", okText = "确定", cancelText = "取消" } = props


    const el = document.createElement('div');
    modalRoot.appendChild(el);

    const destroy = () => {
        ReactDOM.unmountComponentAtNode(el)
        try {
            modalRoot.removeChild(el);
        } catch (e) {

        }
        //移除事件
        window.removeEventListener('hashchange', destroy, false);
    }

    //切换路由时移除modal
    window.addEventListener('hashchange', destroy, false);

    const handleOk = () => {
        props.onOk && props.onOk()
        destroy()
    }

    const handleCancel = () => {
        props.onCancel && props.onCancel()
        destroy()
    }

    ReactDOM.render(
        <div className="pdv-modal">
            <div className="mask"></div>
            <div className="wrap">
                <div className="modal">
                    <div className="content">
                        <button className="close" onClick={handleCancel}>
                            &times;
                        </button>
                        <div className="header">
                            <span className="title">{title}</span>
                        </div>
                        <div className="body">
                            {props.children}
                        </div>
                        <div className="footer">
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

