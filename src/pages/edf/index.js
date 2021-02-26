import React from 'react';
import publicModule from 'publicModule'
const Login = React.lazy(() => import(/* webpackChunkName: "edf.login" */`@/pages/edf/login`))
const Register = React.lazy(() => import(/* webpackChunkName: "edf.register" */`@/pages/edf/register`))
const Portal = React.lazy(() => import(/* webpackChunkName: "por.portal" */`@/pages/por/portal`))

const arr = [
    {
        exact: true,
        path: '/login',
        component: Login
    },
    {
        exact: true,
        path: '/register',
        component: Register
    },
    {
        exact: true,
        path: '/portal',
        component: Portal
    }
]

publicModule.set('edf', arr)

export default arr;