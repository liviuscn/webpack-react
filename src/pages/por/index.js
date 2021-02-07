import React from 'react';
import publicModule from 'publicModule'
const Portal = React.lazy(() => import(/* webpackChunkName: "por.portal" */`@/pages/por/portal`))

const arr = [
    { exact: true, path: '/portal', component: Portal }
]

publicModule.set('por', arr)

export default arr;