import React from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useHistory,Link } from "react-router-dom";
import './index.less';
const { Header, Content, Footer } = Layout;

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
        <Layout className="login-container">
            <Header className="header">
                欢迎来到后台管理系统！请登录
            </Header>
            <Content className="content-container">
                <Form
                    className="form-container"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 12 }}
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
                        <Input placeholder="登录账号"/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入登录密码!' }]}
                    >
                        <Input.Password placeholder="登录密码"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 12 }} name="remember" valuePropName="checked">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
                        没有账号？<Link  to="/register">立即注册</Link>
                    </Form.Item>
                </Form>
            </Content>
            <Footer className="footer">liviuscn@1991</Footer>
        </Layout>
    );
};
