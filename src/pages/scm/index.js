import React from 'react';

const Home = React.lazy(() => import(/* webpackChunkName: "scm.home" */`@/pages/scm/home`))
const User = React.lazy(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/user`))

const arr = [
    { exact: true, path: '/', component: Home },
    { exact: true, path: '/home', component: Home },
    { exact: true, path: '/user', component: User },
]

window.publicModule && window.publicModule.callback(arr, 'scm')

export default arr;