import React from 'react';
import publicModule from 'publicModule'
const Home = React.lazy(() => import(/* webpackChunkName: "scm.home" */`@/pages/scm/home`))
const User = React.lazy(() => import(/* webpackChunkName: "scm.user" */`@/pages/scm/user`))

const arr = [
    { exact: true, path: '/home', component: Home },
    { exact: true, path: '/user', component: User },
]

publicModule.set('scm',arr);

export default arr;