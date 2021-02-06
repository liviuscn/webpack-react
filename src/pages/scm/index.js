import React from 'react';
import publicModule from 'loadGlobalModules'
const Home = React.lazy(() => import(/* webpackChunkName: "scm.home" */`@/pages/scm/home`))
const User = React.lazy(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/user`))

const arr = [
    { exact: true, path: '/', component: Home },
    { exact: true, path: '/home', component: Home },
    { exact: true, path: '/user', component: User },
]

publicModule.callback(arr, 'scm')

export default arr;