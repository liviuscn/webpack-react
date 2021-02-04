import React from 'react';

const Login = React.lazy(() => import(/* webpackChunkName: "edf.login" */`@/pages/edf/login`))
const Register = React.lazy(() => import(/* webpackChunkName: "edf.register" */`@/pages/edf/register`))

export default [
    {
        exact: true,
        path: '/login',
        component: Login
    },
    {
        exact: true,
        path: '/register',
        component: Register
    }
]