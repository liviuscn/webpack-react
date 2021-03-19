import React from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from "react-router-dom";
const { Header, Content, Footer } = Layout;
import './index.less'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default () => {
    const history = useHistory();

    const onFinish = (values) => {
        console.log('Success:', values);
        history.replace("/portal/home");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <Layout className="register-container">
        <Header>
            注册
        </Header>
        <Content>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: '请输入账号!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="再次输入密码"
                    name="password"
                    rules={[{ required: true, message: '请再次输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        立即注册
                        </Button>
                </Form.Item>
            </Form>
            <div>已有账号？<a>立即登录</a></div>
        </Content>
        <Footer>liviuscn@1991</Footer>
    </Layout>
}