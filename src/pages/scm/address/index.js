import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Layout, Button } from 'antd'
const { Header, Content } = Layout;
import './index.less'
/**
 * hooks父组件调用子组件内的方法
 * @param {*} props 
 * @param {*} ref 
 * @returns 
 */
function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput);

export default () => {
    const ref = useRef(null)
    const handleClick = () => {
        ref.current.focus && ref.current.focus()
    }
    return <Layout className="address-container">
        <Button onClick={handleClick}>focus</Button>
        <FancyInput ref={ref} />
        <Content>收货地址</Content>
    </Layout>
}