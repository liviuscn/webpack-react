import * as types from './actionType'
import update from "immutability-helper";
import session from '@/utils/session'

const initialState = {
    panes: [{
        title: '工作台',
        content: '工作台',
        key: '/portal/home',
        closable: false
    }],
    menus: [
        {
            code: '1',
            title: "用户",
            icon: 'UserOutlined',
            children: [
                {
                    code: '11',
                    title: '用户管理',
                    children: [{
                        code: "111",
                        title: "用户信息",
                        path: 'userlist/userinfo'
                    }]
                },
                {
                    id: '12',
                    title: '用户列表',
                    path: 'userlist'
                },
                {
                    id: '13',
                    title: '收货地址',
                    path: 'address'
                },
            ]
        },
        {
            code: '2',
            title: '商品',
            icon: 'LaptopOutlined',
            children: [
                {
                    code: "21",
                    title: '商品分类',
                    path: "shopcategory"
                },
                {
                    code: "22",
                    title: "商品管理",
                    path: "shoplist"
                }
            ]
        },
        {
            code: "3",
            title: "订单",
            icon: 'LaptopOutlined',
            children: [
                {
                    code: "31",
                    title: "订单管理",
                    path: "orderlist"
                }
            ]
        },
        {
            code: "4",
            title: "系统",
            icon: 'NotificationOutlined',
            children: [
                {
                    code: "41",
                    title: "系统设置",
                    path: "setting"
                },
                {
                    code: "42",
                    title: "上传文件",
                    path: "upload"
                },
                {
                    code: "43",
                    title: "登录",
                    path: "iframe/login",
                    isIframe: true,
                    src: '/#/login'
                },
                {
                    code: "44",
                    title: "注册",
                    path: "iframe/register",
                    isIframe: true,
                    src: '/#/register'
                }
            ]
        },
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT_PANES: {
            session.setItem('TABS_DATA', action.payload)
            return update(state, {
                panes: { $set: action.payload }
            });
        }
        default: {
            let TABS_DATA = session.getItem('TABS_DATA');
            if (TABS_DATA) {
                return update(state, {
                    panes: { $set: TABS_DATA }
                });
            }
            return state;
        }
    }
}