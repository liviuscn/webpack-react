import React from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from "react-router-dom";
import './index.less';
const { Header, Content, Footer } = Layout;
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

    return (
        <Layout>
            <Header>
                欢迎来到！
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
                        rules={[{ required: true, message: '请输入登录账号!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入登录密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <div>没有账号？<a>立即注册</a></div>
            </Content>
            <Footer>liviuscn@1991</Footer>
        </Layout>
    );
};
