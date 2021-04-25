const fakeMenus = [
    {
        title: "用户",
        icon: 'UserOutlined',
        children: [
            {
                title: '用户管理',
                path: 'userlist',
                children: [{
                    title: "用户信息",
                    path: 'userlist/userinfo'
                }]
            },
            {
                title: '收货地址',
                path: 'address'
            },
        ]
    },
    {
        title: '商品',
        icon: 'LaptopOutlined',
        children: [
            {
                title: '商品分类',
                path: "shopcategory"
            },
            {
                title: "商品管理",
                path: "shoplist"
            }
        ]
    },
    {
        title: "订单",
        icon: 'LaptopOutlined',
        children: [
            {
                title: "订单管理",
                path: "orderlist"
            }
        ]
    },
    {
        title: "系统",
        icon: 'NotificationOutlined',
        children: [
            {
                title: "系统设置",
                path: "setting"
            },
            {
                title: "上传文件",
                path: "upload"
            },
            {
                title: "登录",
                path: "iframe/login",
                isIframe: true,
                src: '/#/login'
            },
            {
                title: "注册",
                path: "iframe/register",
                isIframe: true,
                src: '/#/register'
            }
        ]
    },

]

export default fakeMenus