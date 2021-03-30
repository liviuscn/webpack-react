import React, { useRef, useEffect, useState } from 'react';
import { Form, Layout, Table, Input, Pagination, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import Condition from '@/components/Condition'
const { Content } = Layout;
import './index.less'
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
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

let data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i + 1,
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}
export default (props) => {
    const tableRef = useRef(null);
    const [y, setY] = useState(0)
    const [visible, setVisible] = useState(false)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 46
    })
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState(data)
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

    const handleCurrentPageChange = (page, pageSize) => {

        if (pageSize !== pagination.pageSize) {
            page = 1
        }
        console.log(page, pageSize, 'handleCurrentPageChange')
        setPagination({
            current: page,
            pageSize: pageSize,
            total: 46
        })
        setLoading(true)

        setTimeout(() => {
            let data = [];
            for (let i = 0; i < pageSize; i++) {
                data.push({
                    key: i + 1 + (page - 1) * pageSize,
                    id: i + (page - 1) * pageSize,
                    name: `Edward King ${i}`,
                    age: 32,
                    address: `London, Park Lane no. ${i}`,
                });
            }
            setDataSource(data)
            setLoading(false)
        }, 3000)

    }
    const handleShowTotal = (total, range) => {
        return `共${total}条`
    }
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
                <Condition
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancle={() => setVisible(false)}
                    onReset={() => setVisible(false)}
                >
                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <Input />
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
                    dataSource={dataSource}
                    bordered={true}
                    loading={loading}
                    pagination={false}
                    scroll={{
                        x: '100%',
                        y: y
                    }}
                >
                </Table>
            </div>
        </Content>
        <Pagination
            pageSizeOptions={['10', '20', '30', '40', '50']}
            showSizeChanger={true}
            // onShowSizeChange={handleShowSizeChange}
            onChange={handleCurrentPageChange}
            showTotal={handleShowTotal}
            showQuickJumper={true}
            className="ant-table-pagination ant-table-pagination-right"
            showQuickJumper={{ goButton: <Button
                style={{marginLeft:8}}
            >跳转</Button> }}
            {...pagination}
        />
    </Layout>
}