import React, { useState } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Router from '@/router/scm';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
import './index.less';
let newTabIndex = 0;
export default () => {
    let { path, url } = useRouteMatch();
    console.log(path,url,'-----------------')
    const [collapsed, setCollapsed] = useState(false);
    const [tabActiveKey, setTabActiveKey] = useState('0')
    const [panes, setPanes] = useState([
        {
            title: '工作台',
            content: '工作台',
            key: '0',
            closable: false
        },
    ])
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }
    const handleTabChange = (activeKey) => {
        setTabActiveKey(activeKey)
    }
    const handleTabEdit = (targetKey, action) => {
        if (action === 'add') {
            add(targetKey)
        } else if (action === 'remove') {
            remove(targetKey)
        }
    }
    const add = (targetKey) => {
        const activeKey = `newTab${newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey })
        setPanes(newPanes);
        setTabActiveKey(activeKey);
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
        setTabActiveKey(newActiveKey);
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
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                        <Menu.Item key="1"><Link to={`${url}/home`}>Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={`${url}/user`}>User</Link></Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
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
                    hideAdd={false}
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