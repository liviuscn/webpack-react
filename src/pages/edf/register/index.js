import React from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useHistory,Link } from "react-router-dom";
import './index.less';
const { Header, Content, Footer } = Layout;

export default () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        history.replace("/portal/home");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout className="register-container">
            <Header className="header">
                欢迎来到后台管理系统！请注册
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
                        name="password1"
                        rules={[{ required: true, message: '请输入登录密码!' }]}
                    >
                        <Input.Password placeholder="登录账号"/>
                    </Form.Item>
                    <Form.Item
                        label="重复密码"
                        name="password2"
                        rules={[{ required: true, message: '请再次输入登录密码!' }]}
                    >
                        <Input.Password placeholder="再次输入登录密码"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 12 }} name="remember" valuePropName="checked">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 12 }}>
                        已有账号？<Link  to="/login">立即登录</Link>
                    </Form.Item>
                </Form>
            </Content>
            <Footer className="footer">liviuscn@1991</Footer>
        </Layout>
    );
};
