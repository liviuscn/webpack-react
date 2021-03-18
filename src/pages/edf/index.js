import loadable from '@loadable/component'
import publicModule from 'publicModule';
const Portal = loadable(() => import(/* webpackChunkName: "edf.portal" */`@/pages/edf/portal`))
const Login = loadable(() => import(/* webpackChunkName: "edf.login" */`@/pages/edf/login`))
const Register = loadable(() => import(/* webpackChunkName: "edf.register" */`@/pages/edf/register`))

const arr = [
    {
        path: '/portal',
        component: Portal
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]

publicModule.set('edf', arr)

export default arr;