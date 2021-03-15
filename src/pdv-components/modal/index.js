import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'

import show from './show'
import confirm from './confirm'
import error from './error'
import info from './info'
import success from './success'
import warning from "./warning";
import './index.less';
/*
    Modal通过visible来控制弹出与否
    还可以通过方法弹出其他弹框
*/
const modalRoot = document.getElementById('modal-root');
class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        //this.el.className = 'pdv-modal'

        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    static defaultProps = {
        cancelText: '取 消',
        closable: true,
        mask: true,
        okText: '确 定',
        title: '提示'
    }
    componentDidMount() {
        // 在 Modal 的所有子元素被挂载后，
        // 这个 portal 元素会被嵌入到 DOM 树中，
        // 这意味着子元素将被挂载到一个分离的 DOM 节点中。
        // 如果要求子组件在挂载时可以立刻接入 DOM 树，
        // 例如衡量一个 DOM 节点，
        // 或者在后代节点中使用 ‘autoFocus’，
        // 则需添加 state 到 Modal 中，
        // 仅当 Modal 被插入 DOM 树中才能渲染子元素。
        if (this.props.visible) {
            modalRoot.appendChild(this.el);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible !== prevProps.visible) {
            if (this.props.visible) {
                modalRoot.appendChild(this.el);
            } else {
                modalRoot.removeChild(this.el);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.visible) {
            modalRoot.removeChild(this.el);
        }
    }

    handleOk() {
        this.props.onOk && this.props.onOk()
    }

    handleCancel() {
        this.props.onCancel && this.props.onCancel()
    }

    render() {

        return ReactDOM.createPortal(
            <div className="pdv-modal">
                <div className="mask"></div>
                <div className="wrap">
                    <div className="modal">
                        <div className="content">
                            <button className="close" onClick={this.handleCancel}>
                                &times;
                            </button>
                            <div className="header">
                                <span className="title">{this.props.title}</span>
                            </div>
                            <div className="body">
                                {this.props.children}
                            </div>
                            <div className="footer">
                                <button onClick={this.handleOk}><span>{this.props.okText}</span></button>
                                <button onClick={this.handleCancel}><span>{this.props.cancelText}</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            this.el
        );
    }
}

Modal.show = show
Modal.confirm = confirm
Modal.error = error
Modal.info = info
Modal.success = success
Modal.warning = warning

export default Modal
