import loadable from '@loadable/component'
import publicModule from 'publicModule'
const Home = loadable(() => import(/* webpackChunkName: "scm.home" */`@/pages/scm/home`))
const Iframe = loadable(() => import(/* webpackChunkName: "scm.iframe" */`@/pages/scm/iframe`))

const Address = loadable(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/address`))
const OrderList = loadable(() => import(/* webpackChunkName: "scm.orderlist" */`@/pages/scm/orderlist`))
const OrderDetail = loadable(() => import(/* webpackChunkName: "scm.orderdetail" */`@/pages/scm/orderdetail`))
const Setting = loadable(() => import(/* webpackChunkName: "scm.setting" */`@/pages/scm/setting`))
const ShopCard = loadable(() => import(/* webpackChunkName: "scm.shopcard" */`@/pages/scm/shopcard`))
const ShopList = loadable(() => import(/* webpackChunkName: "scm.shoplist" */`@/pages/scm/shoplist`))
const ShopDetail = loadable(() => import(/* webpackChunkName: "scm.shopdetail" */`@/pages/scm/shopdetail`))
const Upload = loadable(() => import(/* webpackChunkName: "scm.upload" */`@/pages/scm/upload`))
const User = loadable(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/user`))
const UserDetail = loadable(() => import(/* webpackChunkName: "scm.userdetail" */`@/pages/scm/userdetail`))

const arr = [
    { path: '/', exact: true, component: Home },
    { path: '/home', component: Home },
    { path: '/iframe/:id', component: Iframe },
    { path: '/userlist', component: User },
    { path: '/userdetail/:id', component: UserDetail },
    { path: '/shoplist', component: ShopList },
    { path: '/shopdetail', component: ShopDetail },
    { path: '/orderlist', component: OrderList },
    { path: '/orderdetail/:id', component: OrderDetail },

    { path: '/setting', component: Setting },
    { path: '/shopcard', component: ShopCard },
    { path: '/upload', component: Upload },
    { path: '/address', component: Address },
   
]

publicModule.set('scm', arr);

export default arr;