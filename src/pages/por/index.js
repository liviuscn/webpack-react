import React from 'react';

const Portal = React.lazy(() => import(/* webpackChunkName: "por.portal" */`@/pages/por/portal`))

const arr = [
    { exact: true, path: '/portal', component: Portal }
]

window.publicModule && window.publicModule.callback(arr, 'por')

export default arr;