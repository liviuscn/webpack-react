import loadable from '@loadable/component'
import publicModule from 'publicModule'
const Address = loadable(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/address`))
const Home = loadable(() => import(/* webpackChunkName: "scm.home" */`@/pages/scm/home`))
const OrderList = loadable(() => import(/* webpackChunkName: "scm.orderlist" */`@/pages/scm/orderlist`))
const Setting = loadable(() => import(/* webpackChunkName: "scm.setting" */`@/pages/scm/setting`))
const ShopCard = loadable(() => import(/* webpackChunkName: "scm.shopcard" */`@/pages/scm/shopcard`))
const ShopDetail = loadable(() => import(/* webpackChunkName: "scm.shopdetail" */`@/pages/scm/shopdetail`))
const ShopList = loadable(() => import(/* webpackChunkName: "scm.shoplist" */`@/pages/scm/shoplist`))
const Upload = loadable(() => import(/* webpackChunkName: "scm.upload" */`@/pages/scm/upload`))
const User = loadable(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/user`))
const Iframe = loadable(() => import(/* webpackChunkName: "scm.iframe" */`@/pages/scm/iframe`))
const arr = [
    { path: '/home', component: Home },
    { path: '/user', component: User },
    { path: '/address', component: Address },
    { path: '/orderlist', component: OrderList },
    { path: '/setting', component: Setting },
    { path: '/shopcard', component: ShopCard },
    { path: '/shopdetail', component: ShopDetail },
    { path: '/shoplist', component: ShopList },
    { path: '/upload', component: Upload },
    { path: '/iframe/:id', component: Iframe },
]

publicModule.set('scm',arr);

export default arr;