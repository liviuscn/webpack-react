import React from 'react';
import publicModule from 'loadGlobalModules'
const Portal = React.lazy(() => import(/* webpackChunkName: "por.portal" */`@/pages/por/portal`))

const arr = [
    { exact: true, path: '/portal', component: Portal }
]

publicModule.callback(arr, 'por')

export default arr;