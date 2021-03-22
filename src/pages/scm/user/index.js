import React, { useRef, useEffect, useState } from 'react';
import { Form, Layout, Table, Input, Pagination } from 'antd';
const { Header, Content } = Layout
import './index.less'
const columns = [
    {
        title: '名称',
        dataIndex: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
    },
    {
        title: '地址',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}
export default (props) => {
    const tableRef = useRef(null);
    const [y, setY] = useState(0)
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
    return <Layout className="user-container">
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
                <Form.Item
                    label="姓名"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="年龄"
                    name="age"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <Input />
                </Form.Item>
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