import loadable from '@loadable/component'
import publicModule from 'publicModule'
const Home = loadable(() => import(/* webpackChunkName: "scm.home" */`@/pages/scm/home`))
const User = loadable(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/user`))

const arr = [
    { path: '/home', component: Home },
    { path: '/user', component: User },
]

publicModule.set('scm',arr);

export default arr;