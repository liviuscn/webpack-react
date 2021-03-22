import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Avatar, Popover, Badge, List } from 'antd'
import moment from 'moment'
import {
    BellOutlined,
    RightOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import './Header.less'

export default (props) => {
    return <Layout.Header className="portal-header-container">
        <div className="header-left">
            <div className="logo" />
            <Menu
                theme="light"
                mode="horizontal"
            >
                <Menu.Item key="1">官网</Menu.Item>
                <Menu.Item key="2">简介</Menu.Item>
                <Menu.Item key="3">联系我们</Menu.Item>
            </Menu>
        </div>
        <div className="header-right">
            <Popover
                placement="bottomRight"
                trigger="click"
                key="notifications"
                overlayClassName="notificationPopover"
                getPopupContainer={trigger => trigger.parentElement}
                content={
                    <div className="notification">
                        <List
                            itemLayout="horizontal"
                            dataSource={props.notifications}
                            locale={{
                                emptyText: <span>You have viewed all notifications.</span>,
                            }}
                            renderItem={item => (
                                <List.Item className="notificationItem">
                                    <List.Item.Meta
                                        title={
                                            <span tooltip lines={1}>
                                                {item.title}
                                            </span>
                                        }
                                        description={moment(item.date).fromNow()}
                                    />
                                    <RightOutlined style={{ fontSize: 10, color: '#ccc' }} />
                                </List.Item>
                            )}
                        />
                        {props.notifications.length ? (
                            <div
                                onClick={props.onAllNotificationsRead}
                                className="clearButton"
                            >
                                <span>Clear notifications</span>
                            </div>
                        ) : null}
                    </div>
                }
            >
                <Badge
                    count={props.notifications.length}
                    dot
                    offset={[-10, 10]}
                    className="badge-notification"
                >
                    <BellOutlined className="icon-notification" />
                </Badge>
            </Popover>
            <Menu key="user" mode="horizontal">
                <Menu.SubMenu
                    title={
                        <Fragment>
                            <span style={{ color: '#999', marginRight: 4 }}>
                                Hi,
                            </span>
                            <span>xiaoming</span>
                            <Avatar style={{ marginLeft: 8 }} src={''} />
                        </Fragment>
                    }
                >
                    <Menu.Item key="SignOut">
                        退出登录
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </div>
    </Layout.Header>
}