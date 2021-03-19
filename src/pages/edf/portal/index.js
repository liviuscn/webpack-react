import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Link, useRouteMatch, useHistory,useLocation } from 'react-router-dom';
import Router from '@/router/scm';
import * as actions from '@/redux/portal/action';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
import './index.less';

export default () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const {pathname} = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [tabActiveKey, setTabActiveKey] = useState('/portal/home')
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
    useEffect(() => {
        setTabActiveKey(pathname)
    }, [pathname])
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }
    const handleTabChange = (activeKey) => {
        history.push(activeKey)
        setTabActiveKey(activeKey)
    }
    const handleTabEdit = (targetKey, action) => {
        if (action === 'add') {
            addTab(targetKey)
        } else if (action === 'remove') {
            removeTab(targetKey)
        }
    }

    const addTab = (newPane) => {
        const index = panes.findIndex(item => item.key === newPane.key)
        if (index === -1) {
            const newPanes = [...panes];
            newPanes.push(newPane)
            setPanes(newPanes);
        }
        history.push(newPane.key)
        setTabActiveKey(newPane.key);
    }

    const removeTab = (targetKey) => {
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
        addTab({
            title: item.props.title || key,
            key: key,
            src: item.props.src
        })
    }

    return <Layout className="portal-container">
        <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}>
                <Menu.Item key="1">介绍</Menu.Item>
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
                        <Menu.Item title="个人信息" key={`${url}/user`}>个人信息</Menu.Item>
                        <Menu.Item title="收货地址" key={`${url}/address`}>收货地址</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="订单">
                        <Menu.Item title="商品" key={`${url}/shoplist`} >商品</Menu.Item>
                        <Menu.Item title="购物车" key={`${url}/shopcard`}>购物车</Menu.Item>
                        <Menu.Item title="订单" key={`${url}/orderlist`}>订单</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="系统">
                        <Menu.Item title="设置" key={`${url}/setting`}>设置</Menu.Item>
                        <Menu.Item title="上传文件" key={`${url}/upload`}>上传文件</Menu.Item>
                        <Menu.Item title="登录" key={`${url}/iframe/login`} src='/#/login'>登录</Menu.Item>
                        <Menu.Item title="注册" key={`${url}/iframe/register`} src='/#/register'>注册</Menu.Item>
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