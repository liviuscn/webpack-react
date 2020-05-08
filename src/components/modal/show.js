import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'

import './modal.less';
// 在 DOM 中有两个容器是兄弟级 （siblings）
const modalRoot = document.getElementById('modal-root');
class Modal extends React.Component {
    constructor(props) {
        console.log(props)
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
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    handleOk() {
        this.props.onOk && this.props.onOk(true);
        modalRoot.removeChild(this.el);
    }

    handleCancel() {
        this.props.onCancel && this.props.onCancel(false);
        modalRoot.removeChild(this.el);
    }

    render() {
        let className = classNames({
            'pdv-modal-root': true
        })
        return ReactDOM.createPortal(
            <div className={className}>
                <div className='pdv-modal-mask'></div>
                <div className='pdv-modal-wrap'>
                    <div className='pdv-modal'>
                        <div className='pdv-modal-content'>
                            <button className='pdv-modal-close' onClick={this.handleCancel}>
                                关闭
                            </button>
                            <div className='pdv-modal-header'>
                                <span className='pdv-modal-header-title'>{this.props.title}</span>
                            </div>
                            <div className='pdv-modal-body'>
                                {this.props.children}
                            </div>
                            <div className='pdv-modal-footer'>
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

export default (props) => {
    
    return <Modal {...props} />


}