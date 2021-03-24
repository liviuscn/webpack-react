import React, { useRef, useEffect, useState } from 'react';
import { Form, Layout, Table, Input, Pagination, Button, Select } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import Condition from '@/components/Condition'
const { Header, Content } = Layout;
import './index.less'
const columns = [
    {
        title: '商品名称',
        dataIndex: 'name',
    },
    {
        title: '价格',
        dataIndex: 'price',
    },
    {
        title: '状态',
        dataIndex: 'status',
    },
    {
        title: '订单状态',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `华为 ${i}`,
        price: "￥3200.00",
        address: `北京市昌平区 ${i}`,
    });
}
export default (props) => {
    const tableRef = useRef(null);
    const [y, setY] = useState(0)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        let height = tableRef.current.offsetHeight - 55.33
        setY(height)
    })

    useEffect(() => {
        const resize = () => {
            let height = tableRef.current.offsetHeight - 55.33
            setY(height)
        }
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    })
    const handleOk = (visible) => {
        // setVisible(visible)
    }
    return <Layout className="order-list-container">
        <div className="form-container">
            <Form
                name="basic"
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
                layout="inline"
            >
                <Condition
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancle={() => setVisible(false)}
                    onReset={() => setVisible(false)}
                >
                    <Form.Item
                        label="状态"
                        name="status"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <Select>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="0">待支付</Select.Option>
                            <Select.Option value="1">已支付</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Condition>
                <Form.Item
                    label="商品名称"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="价格"
                    name="price"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <Input />
                </Form.Item>
                <span className="redooutlined-icon">
                    <RedoOutlined title="刷新" />
                </span>
                <Button onClick={() => setVisible(!visible)}>高级查询</Button>
            </Form>
        </div>
        <Content>
            <div className="table-container" ref={tableRef}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered={true}
                    loading={false}
                    pagination={false}
                    scroll={{
                        x: '100%',
                        y: y
                    }}
                >
                </Table>
            </div>
        </Content>
        <div className='pagination-container'><Pagination
            pageSize={10}
            current={1}
            total={46}
            pageSizeOptions={['10', '20', '30', '40', '50']}
            showSizeChanger={true}
        /></div>
    </Layout>
}