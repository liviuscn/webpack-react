import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Menu, Tabs, Dropdown, Popover } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import Router from '@/router/scm';
import * as actions from '@/redux/portal/action';
import { toggleFullscreen } from '@/utils/fullscreen';
import Header from './Header'
import SiderMenu from './SiderMenu'
import fakeMenus from './fakeMenus'
import './index.less';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { TabPane } = Tabs;


export default () => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [tabActiveKey, setTabActiveKey] = useState('/portal/home')
    const [fullScreened, setFullScreened] = useState(false)
    const [menus, setMenus] = useState([])
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
        //第一次打开，设置菜单数据
        setMenus(fakeMenus)
    }, [])
    useEffect(() => {
        setTabActiveKey(pathname)
    }, [pathname])
    /**
     * 左侧菜单切换
     * @param {*} collapsed 
     */
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed)
    }
    /**
     * tab改变时
     * @param {*} activeKey 
     */
    const handleTabChange = (activeKey) => {
        history.push(activeKey)
        setTabActiveKey(activeKey)
    }
    /**
     * tab增加或移除
     * @param {*} targetKey 
     * @param {*} action 
     */
    const handleTabEdit = (targetKey, action) => {
        if (action === 'add') {
            addTab(targetKey)
        } else if (action === 'remove') {
            removeTab(targetKey)
        }
    }
    /**
     * 打开新tab
     * @param {*} newPane 
     */
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
    /**
     * 关闭tab
     * @param {*} targetKey 
     */
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
    /**
     * 关闭其他tab
     * @param {*} targetKey 
     */
    const removeOtherTab = (targetKey) => {
        let newActiveKey = tabActiveKey;

        const newPanes = panes.filter(pane => (pane.key === targetKey || pane.closable === false));

        let lastIndex = newPanes.findIndex(pane => pane.key === targetKey);
        if (newPanes.length) {
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
    /**
     * 关闭所有tab
     */
    const removeAllTab = (targetKey) => {
        let newActiveKey = tabActiveKey;
        const newPanes = panes.filter(pane => pane.closable === false);
        let lastIndex = newPanes.findIndex(pane => pane.key === targetKey) - 1;
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
    /**
     * 点击左侧菜单
     * @param {*} param0 
     */
    const handleMenuClick = ({ item, key }) => {
        let newKey = `${url}/key`
        addTab({
            title: item.props.title || newKey,
            key: newKey,
            src: item.props.src
        })
    }
    /**
     * 点击tabs右键菜单
     * @param {*} param0 
     */
    const handleContextMenuClick = ({ item, key }) => {

    }
    /**
     * iframe刷新页面
     * @param {*} node 
     */
    const handleRefresh = (node) => {
        console.log(node)
        if (node.key.includes('iframe')) {
            window.frames[0].location.reload()
        }
    }
    /**
     * TabBar渲染修改，增加右键菜单
     * @param {*} props 
     * @param {*} DefaultTabBar 
     * @returns 
     */
    const renderTabBar = (props, DefaultTabBar) => {

        return (
            <DefaultTabBar {...props} className="site-custom-tab-bar" >
                { (node) => {
                    const pane = props.panes.find(item => item.key === node.key) || {};
                    return (
                        <Dropdown
                            key={node.key}
                            overlay={<Menu onClick={handleContextMenuClick}>
                                {pane.props.closable !== false && <Menu.Item onClick={() => removeTab(node.key)}>
                                    <div>关闭</div>
                                </Menu.Item>}
                                <Menu.Item onClick={() => removeOtherTab(node.key)}>
                                    <div>关闭其他</div>
                                </Menu.Item>
                                <Menu.Item onClick={() => removeAllTab(node.key)}>
                                    <div>关闭全部</div>
                                </Menu.Item>
                                {!!pane.props.isIframe && props.activeKey === node.key && <Menu.Item onClick={() => handleRefresh(node)}>
                                    <div>刷新页面</div>
                                </Menu.Item>}
                            </Menu>
                            }
                            trigger={['contextMenu']
                            }
                        >{node}
                        </Dropdown>
                    )
                }
                }
            </DefaultTabBar>
        )
    };

    return <Layout className="portal-container">
        <Header notifications={[{}]}></Header>
        <Layout className="content-layout">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                width={200}
                className="sider"
            >
                {/* <Menu
                    className="menu"
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    onClick={handleMenuClick}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="用户">
                        <Menu.Item title="个人信息" key={`${url}/userlist`}>用户管理</Menu.Item>
                        <Menu.Item title="收货地址" key={`${url}/address`}>收货地址</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="商品">
                        <Menu.Item title="购物车" key={`${url}/shopcategory`}>商品分类</Menu.Item>
                        <Menu.Item title="商品" key={`${url}/shoplist`} >商品管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<LaptopOutlined />} title="订单">
                        <Menu.Item title="订单" key={`${url}/orderlist`}>订单管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<NotificationOutlined />} title="系统">
                        <Menu.Item title="设置" key={`${url}/setting`}>系统设置</Menu.Item>
                        <Menu.Item title="上传文件" key={`${url}/upload`}>上传文件</Menu.Item>
                        <Menu.Item title="登录" key={`${url}/iframe/login`} src='/#/login'>登录</Menu.Item>
                        <Menu.Item title="注册" key={`${url}/iframe/register`} src='/#/register'>注册</Menu.Item>
                    </SubMenu>
                </Menu> */}
                <SiderMenu
                    menus={menus}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout className="content-container" >
                <div className="nav-tabs-wrap">
                    <Tabs
                        type="editable-card"
                        onChange={handleTabChange}
                        activeKey={tabActiveKey}
                        onEdit={handleTabEdit}
                        hideAdd={true}
                        size="small"
                        tabBarExtraContent={{
                            right: <div className="fullscreen">
                                <Popover
                                    overlayClassName="fullscreen_wrap"
                                    placement="bottom"
                                    content={fullScreened ? '退出全屏' : '全屏显示'}
                                    onClick={() => {
                                        setFullScreened(!fullScreened);
                                        toggleFullscreen();
                                    }}
                                    arrowPointAtCenter={true}
                                >
                                    {fullScreened ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                                </Popover>
                            </div>
                        }}
                        renderTabBar={renderTabBar}
                    >
                        {panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable} isIframe={pane.src}></TabPane>
                        ))}
                    </Tabs>
                </div>
                <Layout className="content" >
                    <Router path={path} />
                </Layout>
            </Layout>
        </Layout>
    </Layout>
}