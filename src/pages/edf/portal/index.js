import React, { useState, useCallback } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import Router from '@/router/scm';
import * as actions from '@/redux/portal/action'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
import './index.less';

export default () => {
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const [collapsed, setCollapsed] = useState(false);
    const [tabActiveKey, setTabActiveKey] = useState('0')
    const portalState = useSelector((state) => state.portal);
    const dispatch = useDispatch()
    const { panes } = portalState;
    const setPanes = useCallback(
        (payload) => dispatch({
            type: 'INCREMENT_PANES',
            payload
        }),
        [dispatch]
    )

    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }
    const handleTabChange = (activeKey) => {
        history.push(activeKey)
        setTabActiveKey(activeKey)
    }
    const handleTabEdit = (targetKey, action) => {
        if (action === 'add') {
            add(targetKey)
        } else if (action === 'remove') {
            remove(targetKey)
        }
    }
    const add = (newPane) => {
        const index = panes.findIndex(item => item.key === newPane.key)
        if (index === -1) {
            const newPanes = [...panes];
            newPanes.push(newPane)
            setPanes(newPanes);
        }
        history.push(newPane.key)
        setTabActiveKey(newPane.key);
    }
    const remove = (targetKey) => {
        let newActiveKey = tabActiveKey;
        let lastIndex = panes.findIndex(pane => pane.key === targetKey) - 1;
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setPanes(newPanes);
        history.push(newActiveKey)
        setTabActiveKey(newActiveKey);
    }
    const handleClickMenu = ({ item, key }) => {
        console.log(key, item)
        add({
            title: item.props.title || key,
            key: key,
        })
    }
    return <Layout className="portal-container">
        <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Header>
        <Layout className="content-layout">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                width={200}
                className="sider"
            >
                <Menu
                    className="menu"
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    onClick={handleClickMenu}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="用户中心">
                        <Menu.Item title="user" key={`${url}/user`}>个人信息</Menu.Item>
                        <Menu.Item title="address" key={`${url}/address`}>收货地址</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="订单">
                        <Menu.Item key={`${url}/shoplist`} >商品</Menu.Item>
                        <Menu.Item key={`${url}/shopcard`}>购物车</Menu.Item>
                        <Menu.Item key={`${url}/orderlist`}>订单</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="系统">
                        <Menu.Item key={`${url}/setting`}>设置</Menu.Item>
                        <Menu.Item key={`${url}/upload`}>上传文件</Menu.Item>
                        <Menu.Item key={`${url}/iframe`}>iframe</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="content-container" >
                <Tabs
                    className="tabs"
                    type="editable-card"
                    onChange={handleTabChange}
                    activeKey={tabActiveKey}
                    onEdit={handleTabEdit}
                    hideAdd={true}
                    size="small"
                    tabBarGutter={1}
                >
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>

                        </TabPane>
                    ))}
                </Tabs>
                <Content className="content" >
                    <Router path={path} />
                </Content>
            </Layout>
        </Layout>
    </Layout>
}