import React from "react";
import { Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const icon = {
    'UserOutlined': <UserOutlined />,
    'LaptopOutlined': <LaptopOutlined />,
    'NotificationOutlined': <NotificationOutlined />,
}
export default (props) => {
    const renderMenuItem = (menu) => {
        if (menu.children && menu.children.length > 0) {
            const renderChildrenItems = [];
            for (const child of menu.children) {
                renderChildrenItems.push(renderMenuItem(child));
            }
            return (
                <Menu.SubMenu
                    key={menu.code}
                    title={menu.title}
                    icon={icon[menu.icon] || <LaptopOutlined />}
                >
                    {renderChildrenItems}
                </Menu.SubMenu>
            );
        } else {
            return (
                <Menu.Item title={menu.title} key={menu.path} src={menu.src}>
                    {menu.title}
                </Menu.Item>
            );
        }
    };
    return (
        <Menu
            className="menu"
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            onClick={props.onClick}>
            {props.menus.map((menu) => renderMenuItem(menu))}
        </Menu>
    );
};