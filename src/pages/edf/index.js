import React from 'react';

const Login = React.lazy(() => import(/* webpackChunkName: "edf.[request][index]" */`@/pages/edf/login`))
const Register = React.lazy(() => import(/* webpackChunkName: "edf.[request][index]" */`@/pages/edf/register`))

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